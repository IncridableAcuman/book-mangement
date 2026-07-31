package com.book.library.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {
    @Value("${jwt.refresh_time}")
    private int refreshTime;

    private void cookieManaging(String token,int expiration, HttpServletResponse response){
        Cookie cookie = new Cookie("refreshToken",token);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(expiration);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setValue(token);

        response.addCookie(cookie);
    }
    public void addTokenToCookie(String token,HttpServletResponse response){
        cookieManaging(token,refreshTime/1000,response);
    }
    public void clearTokenFromCookie(HttpServletResponse response){
        cookieManaging(null,0,response);
    }
}
