package com.wipro.appverse.dto.response;


import com.wipro.appverse.enums.AppStatus;
import com.wipro.appverse.enums.CategoryType;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AppResponseDTO {

    private Long id;
    private String appName;
    private String appDescription;
    private String appVersion;
    private String appLogoUrl;
    private CategoryType category;
    private AppStatus status;
    private Double averageRating;
    private Integer totalDownloads;
    private Integer totalReviews;
    private LocalDateTime createdAt;

    // getters & setters
}

