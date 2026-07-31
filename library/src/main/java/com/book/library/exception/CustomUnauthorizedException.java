package com.book.library.exception;

public class CustomUnauthorizedException extends RuntimeException{
    public CustomUnauthorizedException(String message){
        super(message);
    }
}
