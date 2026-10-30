package com.book.library.domain.user.service;

import com.book.library.domain.user.dto.UserResponse;
import com.book.library.domain.user.entity.UserEntity;
import com.book.library.domain.user.entity.enums.Role;
import com.book.library.domain.user.repository.UserRepository;
import com.book.library.exception.CustomBadRequestException;
import com.book.library.exception.CustomNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private UserEntity user;

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setId(1L);
        user.setUsername("john_doe");
        user.setEmail("john@example.com");
        user.setPassword("secret");
        user.setRole(Role.USER);
    }

    @Test
    @DisplayName("findUserByEmail: foydalanuvchi topilganda qaytarishi kerak")
    void findUserByEmail_Found() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));

        UserEntity result = userService.findUserByEmail("john@example.com");

        assertNotNull(result);
        assertEquals("john_doe", result.getUsername());
        assertEquals("john@example.com", result.getEmail());
    }

    @Test
    @DisplayName("findUserByEmail: topilmaganda CustomNotFoundException otishi kerak")
    void findUserByEmail_NotFound() {
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        assertThrows(CustomNotFoundException.class, () -> userService.findUserByEmail("notfound@example.com"));
    }

    @Test
    @DisplayName("saveUser: foydalanuvchini muvaffaqiyatli saqlashi kerak")
    void saveUser_Success() {
        when(userRepository.save(user)).thenReturn(user);

        userService.saveUser(user);

        verify(userRepository, times(1)).save(user);
    }

    @Test
    @DisplayName("existUser: email oldin mavjud bo'lsa CustomBadRequestException otishi kerak")
    void existUser_ThrowsException() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));

        assertThrows(CustomBadRequestException.class, () -> userService.existUser("john@example.com"));
    }

    @Test
    @DisplayName("existUser: email mavjud bo'lmasa hech narsa otmasligi kerak")
    void existUser_DoesNotThrow() {
        when(userRepository.findByEmail("new@example.com")).thenReturn(Optional.empty());

        assertDoesNotThrow(() -> userService.existUser("new@example.com"));
    }

    @Test
    @DisplayName("getMe: UserResponse DTO to'g'ri shakllanishi kerak")
    void getMe_Success() {
        UserResponse response = userService.getMe(user);

        assertNotNull(response);
        assertEquals(user.getId(), response.id());
        assertEquals(user.getUsername(), response.username());
        assertEquals(user.getEmail(), response.email());
        assertEquals(user.getRole(), response.role());
    }
}
