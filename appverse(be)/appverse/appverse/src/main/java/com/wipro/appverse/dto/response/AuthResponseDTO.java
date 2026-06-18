package com.wipro.appverse.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthResponseDTO {

    private String token;
    private String role;
    private String email;

    public AuthResponseDTO(String token, String role, String email) {
        this.token = token;
        this.role = role;
        this.email = email;
    }

    // getters
}

