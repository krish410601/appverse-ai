package com.wipro.appverse.service;


import com.wipro.appverse.dto.request.AuthRequestDTO;
import com.wipro.appverse.dto.response.AuthResponseDTO;
import com.wipro.appverse.dto.request.RegisterRequestDTO;
import com.wipro.appverse.dto.request.ResetPasswordRequest;

public interface AuthService {

    void register(RegisterRequestDTO dto);

    AuthResponseDTO login(AuthRequestDTO dto);

    void resetPassword(ResetPasswordRequest request);
}
