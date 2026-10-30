package com.book.library.domain.auth.controller;

import com.book.library.domain.auth.dto.AuthDto;
import com.book.library.domain.auth.service.AuthService;
import com.book.library.exception.CustomBadRequestException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();

    @MockitoBean
    private AuthService authService;

    @Test
    @DisplayName("POST /auth/register - 201 Created va token qaytarishi kerak")
    void register_Success() throws Exception {
        AuthDto.RegisterRequest request = new AuthDto.RegisterRequest();
        request.setUsername("testuser");
        request.setEmail("test@example.com");
        request.setPassword("password123");

        AuthDto.AuthResponse authResponse = new AuthDto.AuthResponse("mockAccessToken");
        when(authService.register(any(AuthDto.RegisterRequest.class), any(HttpServletResponse.class))).thenReturn(authResponse);

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken").value("mockAccessToken"));
    }

    @Test
    @DisplayName("POST /auth/register - noto'g'ri (bo'sh) ma'lumotlar bilan 400 Bad Request qaytarishi kerak")
    void register_ValidationError() throws Exception {
        AuthDto.RegisterRequest request = new AuthDto.RegisterRequest();
        request.setUsername(""); // blank
        request.setEmail("invalid-email"); // invalid
        request.setPassword("");

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /auth/login - to'g'ri ma'lumotlar bilan 200 OK qaytarishi kerak")
    void login_Success() throws Exception {
        AuthDto.LoginRequest request = new AuthDto.LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("password123");

        AuthDto.AuthResponse authResponse = new AuthDto.AuthResponse("mockAccessToken");
        when(authService.login(any(AuthDto.LoginRequest.class), any(HttpServletResponse.class))).thenReturn(authResponse);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("mockAccessToken"));
    }

    @Test
    @DisplayName("POST /auth/login - noto'g'ri parol bilan 400 Bad Request qaytarishi kerak")
    void login_WrongPassword() throws Exception {
        AuthDto.LoginRequest request = new AuthDto.LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("wrongPassword");

        when(authService.login(any(AuthDto.LoginRequest.class), any(HttpServletResponse.class)))
                .thenThrow(new CustomBadRequestException("Password does not match"));

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /auth/logout - 200 OK qaytarishi kerak")
    void logout_Success() throws Exception {
        doNothing().when(authService).logout(any(), any());

        mockMvc.perform(post("/auth/logout"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /auth/refresh - 200 OK qaytarishi kerak")
    void refresh_Success() throws Exception {
        AuthDto.AuthResponse authResponse = new AuthDto.AuthResponse("refreshedToken");
        when(authService.refresh(any(), any())).thenReturn(authResponse);

        mockMvc.perform(get("/auth/refresh"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("refreshedToken"));
    }
}
