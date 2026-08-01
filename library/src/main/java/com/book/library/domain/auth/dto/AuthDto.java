package com.book.library.domain.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class AuthDto {

    @Data
    public static class RegisterRequest{
        @NotBlank private String username;
        @NotBlank private String email;
        @NotBlank private String password;
    }
    @Data
    public static class LoginRequest{
        @NotBlank private String email;
        @NotBlank private String password;
    }
    public record AuthResponse(String accessToken){
        public static AuthResponse from(String accessToken){
            return new AuthResponse(accessToken);
        }
    }
}
