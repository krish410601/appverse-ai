package com.wipro.appverse.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.appverse.entity.Analytics;
import com.wipro.appverse.entity.App;
import com.wipro.appverse.entity.Review;
import com.wipro.appverse.repository.AnalyticsRepository;
import com.wipro.appverse.repository.AppRepository;
import com.wipro.appverse.repository.ReviewRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service 
public class AnalyticsServiceImpl implements AnalyticsService{

    @Autowired
    private AppRepository appRepository;

    @Autowired
    private AnalyticsRepository analyticsRepository;

    @Autowired
    private ReviewRepository reviewRepository;


    @Override
public void updateAppAnalytics(Long appId) {
         log.info("updateAppAnalytics service method called");


    App app = appRepository.findById(appId)
            .orElseThrow(() -> new RuntimeException("App not found"));

    Analytics analytics = analyticsRepository
            .findByAppId(appId)
            .orElse(new Analytics());

    analytics.setApp(app);

    // ✅ total downloads
    analytics.setTotalDownloads(app.getTotalDownloads());

    // ✅ total reviews
    List<Review> reviews = reviewRepository.findByAppId(appId);
    analytics.setTotalReviews(reviews.size());

    // ✅ average rating
    double avg = reviews.stream()
            .mapToInt(Review::getRating)
            .average()
            .orElse(0.0);

    analytics.setAverageRating(avg);

    // ✅ sentiment counts (future ready)
    long positive = reviews.stream()
            .filter(r -> "POSITIVE".equalsIgnoreCase(r.getSentiment()))
            .count();

    long negative = reviews.stream()
            .filter(r -> "NEGATIVE".equalsIgnoreCase(r.getSentiment()))
            .count();

    analytics.setPositiveReviewCount((int) positive);
    analytics.setNegativeReviewCount((int) negative);

    analyticsRepository.save(analytics);
}
}
