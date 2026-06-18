package com.wipro.appverse.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wipro.appverse.dto.request.AuthRequestDTO;
import com.wipro.appverse.dto.response.AuthResponseDTO;
import com.wipro.appverse.dto.request.RegisterRequestDTO;
import com.wipro.appverse.dto.request.ResetPasswordRequest;
import com.wipro.appverse.entity.User;
import com.wipro.appverse.enums.RoleType;
import com.wipro.appverse.repository.UserRepository;
import com.wipro.appverse.util.JwtUtil;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;


  

@Override
public void register(RegisterRequestDTO dto) {
    log.info("updateAppAnalytics service method called");

    if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
        throw new ResponseStatusException(
                HttpStatus.CONFLICT,   // ✅ 409
                "User already exists"
        );
    }

    User user = new User();
    user.setFullName(dto.getFullName());
    user.setEmail(dto.getEmail());
    user.setPassword(passwordEncoder.encode(dto.getPassword()));
    user.setRole(RoleType.valueOf(dto.getRole()));

    userRepository.save(user);
}


   @Override
public AuthResponseDTO login(AuthRequestDTO dto) {
    log.info("login service method called");

    try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                dto.getEmail(),
                dto.getPassword()
            )
        );
    } catch (BadCredentialsException ex) {
        // ✅ Wrong password or email
        throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
        );
    } catch (org.springframework.security.core.AuthenticationException ex) {
        // ✅ Any other auth problem
        throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.UNAUTHORIZED,
                "Authentication failed"
        );
    }

    User user = userRepository.findByEmail(dto.getEmail())
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.UNAUTHORIZED,
                    "User not found"
                )
            );

    String token = jwtUtil.generateToken(
            user.getId(),
            user.getEmail(),
            user.getRole().name()
    );

    return new AuthResponseDTO(
            token,
            user.getRole().name(),
            user.getEmail()
    );
}

public void resetPassword(ResetPasswordRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setPassword(passwordEncoder.encode(request.getNewPassword()));

    userRepository.save(user);
}
}
