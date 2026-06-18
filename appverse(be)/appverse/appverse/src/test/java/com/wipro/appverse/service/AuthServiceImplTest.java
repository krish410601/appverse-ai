package com.wipro.appverse.service;


import com.wipro.appverse.dto.request.AuthRequestDTO;
import com.wipro.appverse.dto.request.RegisterRequestDTO;
import com.wipro.appverse.dto.request.ResetPasswordRequest;
import com.wipro.appverse.dto.response.AuthResponseDTO;
import com.wipro.appverse.entity.User;
import com.wipro.appverse.enums.RoleType;
import com.wipro.appverse.repository.UserRepository;
import com.wipro.appverse.util.JwtUtil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthServiceImpl authService;

    private User user;

    @BeforeEach
    void setup() {
        user = new User();
        user.setId(1L);
        user.setEmail("test@gmail.com");
        user.setPassword("hashed");
        user.setRole(RoleType.DEVELOPER);
    }

    // =========================
    // ✅ TEST: REGISTER SUCCESS
    // =========================
    @Test
    void testRegisterSuccess() {

        RegisterRequestDTO dto = new RegisterRequestDTO();
        dto.setFullName("Test User");
        dto.setEmail("test@gmail.com");
        dto.setPassword("1234");
        dto.setRole("DEVELOPER");

        when(userRepository.findByEmail(dto.getEmail()))
                .thenReturn(Optional.empty());

        when(passwordEncoder.encode("1234"))
                .thenReturn("encoded1234");

        authService.register(dto);

        verify(userRepository).save(any(User.class));
    }

    // =========================
    // ✅ TEST: REGISTER DUPLICATE
    // =========================
    @Test
    void testRegisterUserAlreadyExists() {

        RegisterRequestDTO dto = new RegisterRequestDTO();
        dto.setEmail("test@gmail.com");

        when(userRepository.findByEmail(dto.getEmail()))
                .thenReturn(Optional.of(user));

        assertThrows(ResponseStatusException.class,
                () -> authService.register(dto));
    }

    // =========================
    // ✅ TEST: LOGIN SUCCESS
    // =========================
    @Test
    void testLoginSuccess() {

        AuthRequestDTO dto = new AuthRequestDTO();
        dto.setEmail("test@gmail.com");
        dto.setPassword("1234");

        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));

        when(jwtUtil.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().name()
        )).thenReturn("dummy-token");

        AuthResponseDTO response = authService.login(dto);

        assertNotNull(response);
        assertEquals("dummy-token", response.getToken());
        assertEquals("DEVELOPER", response.getRole());

        verify(authenticationManager).authenticate(
                any(UsernamePasswordAuthenticationToken.class));
    }

    // =========================
    // ✅ TEST: LOGIN INVALID CREDENTIALS
    // =========================
    @Test
    void testLoginInvalidCredentials() {

        AuthRequestDTO dto = new AuthRequestDTO();
        dto.setEmail("test@gmail.com");
        dto.setPassword("wrong");

        doThrow(new org.springframework.security.authentication.BadCredentialsException("Bad credentials"))
                .when(authenticationManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));

        assertThrows(ResponseStatusException.class,
                () -> authService.login(dto));
    }

    // =========================
    // ✅ TEST: RESET PASSWORD
    // =========================
    @Test
    void testResetPassword() {

        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setEmail("test@gmail.com");
        request.setNewPassword("newpass");

        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.encode("newpass"))
                .thenReturn("encodedNewPass");

        authService.resetPassword(request);

        assertEquals("encodedNewPass", user.getPassword());
        verify(userRepository).save(user);
    }
}
