package com.wipro.appverse.dto.request;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewRequestDTO {

    @Min(1)
    @Max(5)
    private Integer rating;

    @NotBlank
    private String reviewText;

    private Long appId;

    // getters & setters
}
