package com.book.library.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomUnauthorizedException.class)
    public ResponseEntity<ErrorResponse> customUnauthorizedExceptionHandler(CustomUnauthorizedException exception){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ErrorResponse.from(
                exception,
                HttpStatus.UNAUTHORIZED
        ));
    }

    @ExceptionHandler(CustomInternalServerError.class)
    public ResponseEntity<ErrorResponse> customInternalServerErrorExceptionHandler(CustomInternalServerError exception){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorResponse.from(
                exception,
                HttpStatus.INTERNAL_SERVER_ERROR
        ));
    }
    @ExceptionHandler(CustomBadRequestException.class)
    public ResponseEntity<ErrorResponse> customUnauthorizedExceptionHandler(CustomBadRequestException exception){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorResponse.from(
                exception,
                HttpStatus.BAD_REQUEST
        ));
    }
    @ExceptionHandler(CustomNotFoundException.class)
    public ResponseEntity<ErrorResponse> customNotFoundExceptionHandler(CustomNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorResponse.from(
                exception,
                HttpStatus.NOT_FOUND
        ));
    }
}
