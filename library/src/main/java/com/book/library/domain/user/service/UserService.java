package com.book.library.domain.user.service;

import com.book.library.domain.user.entity.UserEntity;
import com.book.library.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserEntity findUserByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User not found"));
    }
    @Transactional
    public void saveUser(UserEntity user){
        userRepository.save(user);
    }
}
