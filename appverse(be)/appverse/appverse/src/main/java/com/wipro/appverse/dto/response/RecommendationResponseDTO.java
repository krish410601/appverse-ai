package com.wipro.appverse.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RecommendationResponseDTO {

    private Long appId;
    private String appName;
    private String category;
    private Double score;
    private String reason;

    // getters & setters
}
