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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private TokenService tokenService;
    @Mock
    private UserService userService;
    @Mock
    private JwtUtil jwtUtil;
    @Mock
    private CookieUtil cookieUtil;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private HttpServletResponse response;

    @InjectMocks
    private AuthService authService;

    private UserEntity user;
    private AuthDto.RegisterRequest registerRequest;
    private AuthDto.LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setId(1L);
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("encodedPassword");
        user.setRole(Role.USER);

        registerRequest = new AuthDto.RegisterRequest();
        registerRequest.setUsername("testuser");
        registerRequest.setEmail("test@example.com");
        registerRequest.setPassword("password123");

        loginRequest = new AuthDto.LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");
    }

    @Test
    @DisplayName("register: yangi foydalanuvchi muvaffaqiyatli ro'yxatdan o'tishi kerak")
    void register_Success() {
        doNothing().when(userService).existUser(registerRequest.getEmail());
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        doNothing().when(userService).saveUser(any(UserEntity.class));
        when(jwtUtil.generateRefreshToken(any(UserEntity.class))).thenReturn("refreshTokenSample");
        when(jwtUtil.generateAccessToken(any(UserEntity.class))).thenReturn("accessTokenSample");

        AuthDto.AuthResponse authResponse = authService.register(registerRequest, response);

        assertNotNull(authResponse);
        assertEquals("accessTokenSample", authResponse.accessToken());
        verify(userService, times(1)).existUser("test@example.com");
        verify(userService, times(1)).saveUser(any(UserEntity.class));
        verify(cookieUtil, times(1)).addTokenToCookie(eq("refreshTokenSample"), eq(response));
        verify(tokenService, times(1)).saveToken(eq("refreshTokenSample"), any(UserEntity.class));
    }

    @Test
    @DisplayName("register: email mavjud bo'lsa CustomBadRequestException otishi kerak")
    void register_EmailAlreadyExists() {
        doThrow(new CustomBadRequestException("User already exist"))
                .when(userService).existUser(registerRequest.getEmail());

        assertThrows(CustomBadRequestException.class, () -> authService.register(registerRequest, response));
        verify(userService, never()).saveUser(any(UserEntity.class));
    }

    @Test
    @DisplayName("login: to'g'ri ma'lumotlar bilan muvaffaqiyatli kirish kerak")
    void login_Success() {
        when(userService.findUserByEmail(loginRequest.getEmail())).thenReturn(user);
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);
        when(jwtUtil.generateRefreshToken(user)).thenReturn("refreshTokenSample");
        when(jwtUtil.generateAccessToken(user)).thenReturn("accessTokenSample");

        AuthDto.AuthResponse authResponse = authService.login(loginRequest, response);

        assertNotNull(authResponse);
        assertEquals("accessTokenSample", authResponse.accessToken());
        verify(cookieUtil, times(1)).addTokenToCookie("refreshTokenSample", response);
    }

    @Test
    @DisplayName("login: parol mos kelmasa CustomBadRequestException otishi kerak")
    void login_WrongPassword() {
        when(userService.findUserByEmail(loginRequest.getEmail())).thenReturn(user);
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(false);

        assertThrows(CustomBadRequestException.class, () -> authService.login(loginRequest, response));
        verify(cookieUtil, never()).addTokenToCookie(any(), any());
    }

    @Test
    @DisplayName("logout: tokenni tozalab cookie-ni o'chirishi kerak")
    void logout_Success() {
        String refreshToken = "sampleRefreshToken";
        TokenEntity tokenEntity = new TokenEntity();
        tokenEntity.setRefreshToken(refreshToken);
        tokenEntity.setUser(user);

        when(jwtUtil.validateTokenAndGetUserEmail(refreshToken)).thenReturn(user);
        when(tokenService.findToken(user)).thenReturn(tokenEntity);

        authService.logout(refreshToken, response);

        verify(cookieUtil, times(1)).clearTokenFromCookie(response);
        verify(tokenService, times(1)).removeToken(user);
    }

    @Test
    @DisplayName("refresh: yangi access token qaytarishi kerak")
    void refresh_Success() {
        String refreshToken = "validRefreshToken";
        TokenEntity tokenEntity = new TokenEntity();
        tokenEntity.setRefreshToken(refreshToken);
        tokenEntity.setUser(user);

        when(jwtUtil.validateTokenAndGetUserEmail(refreshToken)).thenReturn(user);
        when(tokenService.findToken(user)).thenReturn(tokenEntity);
        when(jwtUtil.generateRefreshToken(user)).thenReturn("newRefreshToken");
        when(jwtUtil.generateAccessToken(user)).thenReturn("newAccessToken");

        AuthDto.AuthResponse authResponse = authService.refresh(refreshToken, response);

        assertNotNull(authResponse);
        assertEquals("newAccessToken", authResponse.accessToken());
    }
}
