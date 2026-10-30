package com.book.library.domain.user.controller;

import com.book.library.domain.user.dto.UserResponse;
import com.book.library.domain.user.entity.UserEntity;
import com.book.library.domain.user.entity.enums.Role;
import com.book.library.domain.user.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Test
    @WithMockUser(username = "john@example.com", roles = "USER")
    @DisplayName("GET /user - avtorizatsiyadan o'tgan foydalanuvchi ma'lumotlarini 200 OK bilan qaytarishi kerak")
    void getMe_Authenticated() throws Exception {
        UserResponse response = new UserResponse(1L, "john", "john@example.com", Role.USER);
        when(userService.getMe(any())).thenReturn(response);

        mockMvc.perform(get("/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("john"))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    @DisplayName("GET /user - avtorizatsiyasiz 403 Forbidden qaytarishi kerak")
    void getMe_Unauthenticated() throws Exception {
        mockMvc.perform(get("/user"))
                .andExpect(status().isForbidden());
    }
}
