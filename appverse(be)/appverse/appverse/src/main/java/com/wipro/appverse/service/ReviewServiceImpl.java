package com.wipro.appverse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wipro.appverse.dto.request.ReviewRequestDTO;
import com.wipro.appverse.dto.response.ReviewResponseDTO;
import com.wipro.appverse.entity.App;
import com.wipro.appverse.entity.Review;
import com.wipro.appverse.entity.User;
import com.wipro.appverse.enums.AppStatus;
import com.wipro.appverse.repository.AppRepository;
import com.wipro.appverse.repository.ReviewRepository;
import com.wipro.appverse.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private AppRepository appRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AnalyticsService analyticsService;

    @Override
    public ReviewResponseDTO addReview(ReviewRequestDTO dto, Long userId) {
        log.info("addReview service method called");

        App app = appRepository.findById(dto.getAppId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "App not found"));

        if (app.getStatus() != AppStatus.APPROVED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Cannot review unapproved app");
        }

        // ✅ Prevent duplicate review
        reviewRepository.findByUserIdAndAppId(userId, dto.getAppId())
                .ifPresent(r -> {
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "You already reviewed this app");
                });

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "User not found"));

        Review review = new Review();
        review.setRating(dto.getRating());
        review.setReviewText(dto.getReviewText());
        review.setUser(user);
        review.setApp(app);

        Review saved = reviewRepository.save(review);

        // ✅ Update app average rating
        updateAverageRating(app.getId());

        
// ✅ ADD THIS
analyticsService.updateAppAnalytics(app.getId());


        return mapToResponse(saved);
    }

    @Override
    public List<ReviewResponseDTO> getReviewsByApp(Long appId) {
        log.info("getReviewsByApp service method called");

        return reviewRepository.findByAppId(appId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ✅ Helper methods

    private void updateAverageRating(Long appId) {

        List<Review> reviews = reviewRepository.findByAppId(appId);

        double avg = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        App app = appRepository.findById(appId).get();
        app.setAverageRating(avg);
        appRepository.save(app);
    }

    private ReviewResponseDTO mapToResponse(Review review) {

        ReviewResponseDTO dto = new ReviewResponseDTO();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setReviewText(review.getReviewText());
        dto.setSentiment(review.getSentiment());
        dto.setPredictedRating(review.getPredictedRating());
        dto.setConfidenceScore(review.getConfidenceScore());
        dto.setCreatedAt(review.getCreatedAt());
        dto.setUserName(review.getUser().getFullName());


        return dto;
    }

 

    @Override
    public void markReviewAsFake(Long reviewId) {
        log.info("markReviewAsFake service method called");

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Review not found"));

        review.setFakeReviewFlag(true);
        reviewRepository.save(review);


        // ✅ Recalculate average rating
        recalculateAverageRating(review.getApp().getId());
    }

    private void recalculateAverageRating(Long appId) {

        List<Review> validReviews =
                reviewRepository.findByAppIdAndFakeReviewFlagFalse(appId);

        double avg = validReviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        App app = appRepository.findById(appId).get();
        app.setAverageRating(avg);
        appRepository.save(app);
    }

    @Override
public void deleteReviewByAdmin(Long reviewId) {
        log.info("daleteReviewByAdmin service method called");

    Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() ->
                new RuntimeException("Review not found"));

    reviewRepository.delete(review);
}

}
