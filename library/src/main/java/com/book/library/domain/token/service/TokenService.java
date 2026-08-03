package com.book.library.domain.token.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.book.library.domain.token.entity.TokenEntity;
import com.book.library.domain.token.repository.TokenRepository;
import com.book.library.domain.user.entity.UserEntity;
import com.book.library.exception.CustomNotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

    @Transactional
    public void saveToken(String refreshToken, UserEntity user){
        TokenEntity token=tokenRepository.findTokenByUser(user)
                .orElseGet(TokenEntity::new);
        token.setUser(user);
        token.setRefreshToken(refreshToken);
        token.setExpiration(LocalDateTime.now().plusDays(7));
        // save
        tokenRepository.save(token);
    }

    public TokenEntity findToken(UserEntity user){
        return tokenRepository.findTokenByUser(user).orElseThrow(()-> new CustomNotFoundException("Token not found by user:"+user.getEmail()));
    }
    @Transactional
    public void removeToken(UserEntity user){
        TokenEntity tokenEntity = findToken(user);
        tokenRepository.delete(tokenEntity);
    }

}

