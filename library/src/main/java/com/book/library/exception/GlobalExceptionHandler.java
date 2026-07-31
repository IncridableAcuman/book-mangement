package com.book.library.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
}
public record ErrorResponse(
        int status,
        String error,
        String message,
        String path,
        LocalDateTime errorTime
){
    public static ErrorResponse from(Exception exception, HttpStatus status, HttpServletRequest request){

    }
}
