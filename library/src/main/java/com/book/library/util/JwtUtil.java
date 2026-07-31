package com.book.library.util;

import com.book.library.domain.user.entity.UserEntity;
import com.book.library.domain.user.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtUtil {
    @Value("${jwt.refresh_time}")
    private long refreshTime;
    @Value("${jwt.access_time}")
    private long accessTime;
    @Value("${jwt.secret}")
    private String secret;
    private Key key;

    private final UserService userService;

    @PostConstruct
    public void init(){
        this.key= Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
    private String generateToken(UserEntity user,long tokenExpiration){
        long currentMillis = System.currentTimeMillis();
        Date issueAt = new Date(currentMillis);
        Date expirationDate = new Date(currentMillis + tokenExpiration);

        Map<String,Object> claims = new HashMap<>();
        claims.put("id",user.getId());
        claims.put("role",user.getRole());

        return Jwts
                .builder()
                .addClaims(claims)
                .setSubject(user.getEmail())
                .signWith(key)
                .setIssuedAt(issueAt)
                .setExpiration(expirationDate)
                .compact();
    }
    public String generateRefreshToken(UserEntity user){
        return generateToken(user,refreshTime);
    }
    public String generateAccessToken(UserEntity user){
        return generateToken(user,accessTime);
    }
    private Claims extractClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public String extractSubjectFromToken(String token){
        return extractClaims(token).getSubject();
    }
    public Date extractTokenExpirationFromToken(String token){
        return extractClaims(token).getExpiration();
    }
    public boolean isTokenExpired(String token){
        return extractTokenExpirationFromToken(token).before(new Date());
    }
    public boolean validateToken(String token){
        try {
            return !isTokenExpired(token) && extractTokenExpirationFromToken(token)!=null;
        } catch (Exception e) {
            return false;
        }
    }
    public UserEntity validateTokenAndGetUserEmail(String token){
        if (!validateToken(token)){
            throw new RuntimeException("Token invalid or expired");
        }
        String email = extractSubjectFromToken(token);
        return userService.findUserByEmail(email);
    }
}
