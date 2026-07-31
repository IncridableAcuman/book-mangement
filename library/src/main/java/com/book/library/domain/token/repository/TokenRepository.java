package com.book.library.domain.token.repository;

import com.book.library.domain.token.entity.TokenEntity;
import com.book.library.domain.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<TokenEntity,Long> {
    Optional<TokenEntity> findTokenByUser(UserEntity user);

}
