package com.wipro.appverse.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String role;
    private Boolean isActive;
    private String createdAt;
}
