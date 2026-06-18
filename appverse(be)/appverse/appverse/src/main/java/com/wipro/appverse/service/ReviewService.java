package com.wipro.appverse.service;

import java.util.List;

import com.wipro.appverse.dto.request.ReviewRequestDTO;
import com.wipro.appverse.dto.response.ReviewResponseDTO;

public interface ReviewService {

    ReviewResponseDTO addReview(ReviewRequestDTO dto, Long userId);

    List<ReviewResponseDTO> getReviewsByApp(Long appId);

    void markReviewAsFake(Long id);

    void deleteReviewByAdmin(Long reviewId);
}
