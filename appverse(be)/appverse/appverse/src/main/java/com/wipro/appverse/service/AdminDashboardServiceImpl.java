package com.wipro.appverse.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.appverse.dto.response.AdminDashboardStatsDTO;
import com.wipro.appverse.enums.AppStatus;
import com.wipro.appverse.repository.AppRepository;
import com.wipro.appverse.repository.ReviewRepository;
import com.wipro.appverse.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AdminDashboardServiceImpl implements AdminDashboardService {

    @Autowired
    private AppRepository appRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public AdminDashboardStatsDTO getDashboardStats() {
         log.info("getDashboardStats method called");

        long totalApps = appRepository.count();
        long totalUsers = userRepository.count();
        long pendingApps = appRepository.countByStatus(AppStatus.PENDING);
        long fakeReviews = reviewRepository.countByFakeReviewFlagTrue();

        return new AdminDashboardStatsDTO(
                totalApps,
                totalUsers,
                pendingApps,
                fakeReviews
        );
    }
}
