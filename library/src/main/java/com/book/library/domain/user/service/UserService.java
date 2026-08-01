package com.book.library.domain.user.service;

import com.book.library.domain.user.dto.UserResponse;
import com.book.library.domain.user.entity.UserEntity;
import com.book.library.domain.user.repository.UserRepository;
import com.book.library.exception.CustomBadRequestException;
import com.book.library.exception.CustomNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserEntity findUserByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(()-> new CustomNotFoundException("User not found"));
    }
    @Transactional
    public void saveUser(UserEntity user){
        userRepository.save(user);
    }

    public void existUser(String email){
        if (userRepository.findByEmail(email).isPresent()){
            throw new CustomBadRequestException("User already exist");
        }
    }
    public UserResponse getMe(UserEntity user){
        return UserResponse.from(user);
    }
}
