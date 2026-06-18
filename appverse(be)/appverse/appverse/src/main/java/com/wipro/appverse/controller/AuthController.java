package com.wipro.appverse.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.appverse.dto.request.AuthRequestDTO;
import com.wipro.appverse.dto.response.AuthResponseDTO;
import com.wipro.appverse.dto.request.RegisterRequestDTO;
import com.wipro.appverse.dto.request.ResetPasswordRequest;
import com.wipro.appverse.service.AuthService;


import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
         @Valid @RequestBody RegisterRequestDTO dto) {
            log.info("registration method called");
        authService.register(dto);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
          @Valid  @RequestBody AuthRequestDTO dto) {
            
             log.info("login method called");
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/reset-password")
public ResponseEntity<String> resetPassword(
        @RequestBody ResetPasswordRequest request) {
             log.info("resetpassword method called");

    authService.resetPassword(request);

    return ResponseEntity.ok("Password reset successfully");
}
}