package com.wipro.appverse.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthRequestDTO {

    //@Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // getters & setters
}
