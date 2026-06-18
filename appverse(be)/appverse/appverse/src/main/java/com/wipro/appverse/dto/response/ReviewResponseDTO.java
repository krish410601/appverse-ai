package com.wipro.appverse.dto.response;


import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewResponseDTO {

    private Long id;
    private Integer rating;
    private String reviewText;
    private String sentiment;
    private Integer predictedRating;
    private Double confidenceScore;
    private LocalDateTime createdAt;
    private String userName;

    // getters & setters
}

