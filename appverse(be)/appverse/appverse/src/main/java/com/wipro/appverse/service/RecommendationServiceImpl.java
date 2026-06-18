package com.wipro.appverse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wipro.appverse.dto.response.AppResponseDTO;
import com.wipro.appverse.entity.App;
import com.wipro.appverse.entity.DownloadHistory;
import com.wipro.appverse.entity.Recommendation;
import com.wipro.appverse.entity.User;
import com.wipro.appverse.enums.AppStatus;
import com.wipro.appverse.enums.CategoryType;
import com.wipro.appverse.repository.AppRepository;
import com.wipro.appverse.repository.DownloadHistoryRepository;
import com.wipro.appverse.repository.RecommendationRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class RecommendationServiceImpl implements RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    @Autowired
    private AppRepository appRepository;

    @Autowired
    private DownloadHistoryRepository downloadRepository;

    @Override
    public void generateRecommendations(Long userId) {

        log.info("generateRecommendations service method called");

        // ✅ 1. Remove old recommendations
        recommendationRepository.deleteByUserId(userId);

        // ✅ 2. Get user downloads
        List<DownloadHistory> history =
                downloadRepository.findByUserId(userId);

        List<App> apps;

        if (history.isEmpty()) {
            // ✅ fallback → popular apps
            apps = appRepository
                    .findTop10ByStatusOrderByTotalDownloadsDesc(AppStatus.APPROVED);
        } else {
            // ✅ get latest downloaded app category
            CategoryType category =
                    history.get(history.size() - 1)
                           .getApp()
                           .getCategory();

            apps = appRepository
                    .findTop5ByCategoryAndStatusOrderByTotalDownloadsDesc(
                            category,
                            AppStatus.APPROVED
                    );
        }

        // ✅ 3. Save recommendations
        for (App app : apps) {

            Recommendation rec = new Recommendation();

            User user = new User();
            user.setId(userId);

            rec.setUser(user);
            rec.setRecommendedApp(app);
            rec.setRecommendationReason("Based on your activity");
            rec.setScore((double) app.getTotalDownloads());

            recommendationRepository.save(rec);
        }
    }

    @Override
    public List<AppResponseDTO> getUserRecommendations(Long userId) {
        log.info("getUserRecommendations service method called");

        List<Recommendation> recs =
                recommendationRepository.findByUserId(userId);

        // ✅ If exists → return stored
        if (!recs.isEmpty()) {
            return recs.stream()
                    .map(r -> mapToResponse(r.getRecommendedApp()))
                    .toList();
        }

        // ✅ fallback
        return appRepository
                .findTop10ByStatusOrderByTotalDownloadsDesc(AppStatus.APPROVED)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private AppResponseDTO mapToResponse(App app) {

        AppResponseDTO dto = new AppResponseDTO();
       
dto.setId(app.getId());
    dto.setAppName(app.getAppName());
    dto.setAppDescription(app.getAppDescription());
    dto.setAppVersion(app.getAppVersion());
    dto.setCategory(app.getCategory());
    dto.setStatus(app.getStatus());
    dto.setAverageRating(app.getAverageRating());
    dto.setTotalDownloads(app.getTotalDownloads());
    dto.setCreatedAt(app.getCreatedAt());

    dto.setAppLogoUrl(app.getAppLogoUrl());   // ✅ ADD THIS LINE


        return dto;
    }
}