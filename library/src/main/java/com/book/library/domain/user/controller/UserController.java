package com.book.library.domain.user.controller;

import com.book.library.domain.user.dto.UserResponse;
import com.book.library.domain.user.entity.UserEntity;
import com.book.library.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponse> getMe(@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.status(200).body(userService.getMe(user));
    }
}
