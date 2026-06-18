package com.wipro.appverse.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterRequestDTO {

    @NotBlank
    private String fullName;

    @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String role; // USER / DEVELOPER

    // getters & setters
}

