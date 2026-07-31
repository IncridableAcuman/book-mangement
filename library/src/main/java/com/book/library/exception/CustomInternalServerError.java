package com.book.library.exception;

public class CustomInternalServerError extends RuntimeException{
    public CustomInternalServerError(String message){
        super(message);
    }

}
