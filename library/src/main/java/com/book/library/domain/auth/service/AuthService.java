package com.book.library.domain.auth.service;

import com.book.library.domain.auth.dto.AuthDto;
import com.book.library.domain.token.entity.TokenEntity;
import com.book.library.domain.token.service.TokenService;
import com.book.library.domain.user.entity.UserEntity;
import com.book.library.domain.user.entity.enums.Role;
import com.book.library.domain.user.service.UserService;
import com.book.library.exception.CustomBadRequestException;
import com.book.library.util.CookieUtil;
import com.book.library.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenService tokenService;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthDto.AuthResponse register(AuthDto.RegisterRequest request, HttpServletResponse response){
        userService.existUser(request.getEmail());
        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        userService.saveUser(user);
        return authResponse(user,response);
    }
    public AuthDto.AuthResponse login(AuthDto.LoginRequest request,HttpServletResponse response){
        UserEntity user = userService.findUserByEmail(request.getEmail());
        if (!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw new CustomBadRequestException("Password does not match");
        }
        return authResponse(user,response);
    }
    public void logout(String refreshToken,HttpServletResponse response){
        UserEntity user = jwtUtil.validateTokenAndGetUserEmail(refreshToken);
        TokenEntity tokenEntity = tokenService.findToken(user);
        if (!tokenEntity.getRefreshToken().equals(refreshToken)){
            throw new CustomBadRequestException("Token does not match");
        }
        cookieUtil.clearTokenFromCookie(response);
        tokenService.removeToken(user);
    }
    public AuthDto.AuthResponse refresh(String refreshToken,HttpServletResponse response){
        UserEntity user = jwtUtil.validateTokenAndGetUserEmail(refreshToken);
        TokenEntity tokenEntity = tokenService.findToken(user);
        if (!tokenEntity.getRefreshToken().equals(refreshToken)){
            throw new CustomBadRequestException("Token does not match");
        }
        return authResponse(user,response);
    }
    public AuthDto.AuthResponse authResponse(UserEntity user,HttpServletResponse response){
        String refreshToken = jwtUtil.generateRefreshToken(user);
        String accessToken = jwtUtil.generateAccessToken(user);
        cookieUtil.addTokenToCookie(refreshToken,response);
        tokenService.saveToken(refreshToken,user);
        return AuthDto.AuthResponse.from(accessToken);
    }
}
