package com.book.library.domain.auth.service;

import com.book.library.domain.token.service.TokenService;
import com.book.library.domain.user.service.UserService;
import com.book.library.util.CookieUtil;
import com.book.library.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenService tokenService;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
}
