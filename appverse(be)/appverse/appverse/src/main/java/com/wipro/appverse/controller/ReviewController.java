package com.wipro.appverse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.appverse.dto.request.ReviewRequestDTO;
import com.wipro.appverse.dto.response.ReviewResponseDTO;
import com.wipro.appverse.service.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // ✅ USER adds review + rating
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ReviewResponseDTO addReview(@RequestBody ReviewRequestDTO dto) {

        Long userId = (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return reviewService.addReview(dto, userId);
    }

    // ✅ Get reviews for app
    @GetMapping("/app/{appId}")
    public List<ReviewResponseDTO> getReviewsByApp(@PathVariable Long appId) {
        return reviewService.getReviewsByApp(appId);
    }

    
@PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/mark-fake")
    public String markReviewAsFake(@PathVariable Long id) {
        reviewService.markReviewAsFake(id);
        return "Review marked as fake";
    }

    @PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/admin/{reviewId}")
public ResponseEntity<String> deleteReviewByAdmin(
        @PathVariable Long reviewId) {

    reviewService.deleteReviewByAdmin(reviewId);

    return ResponseEntity.ok("Review deleted successfully ✅");
}

}
