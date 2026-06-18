package com.wipro.appverse.dto.request;


import com.wipro.appverse.enums.CategoryType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AppRequestDTO {

    @NotBlank
    private String appName;

    private String appDescription;

    private String appVersion;

    private String appLogoUrl;

    private String appFileUrl;

    private CategoryType category;

    // getters & setters
}
