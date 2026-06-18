package com.wipro.appverse.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wipro.appverse.dto.response.DownloadResponseDTO;
import com.wipro.appverse.entity.App;
import com.wipro.appverse.entity.DownloadHistory;
import com.wipro.appverse.entity.User;
import com.wipro.appverse.enums.AppStatus;
import com.wipro.appverse.repository.AppRepository;
import com.wipro.appverse.repository.DownloadHistoryRepository;
import com.wipro.appverse.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DownloadServiceImpl implements DownloadService {

    @Autowired
    private DownloadHistoryRepository downloadHistoryRepository;

    @Autowired
    private AppRepository appRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private AnalyticsService analyticsService;

    @Override
    public void downloadApp(Long appId, Long userId) {

        log.info("downloadApp service method called");

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "User not found"));

        App app = appRepository.findById(appId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "App not found"));

        // ✅ Only approved apps can be downloaded
        if (app.getStatus() != AppStatus.APPROVED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "App not approved for download"
            );
        }

        // ✅ Save download history
        DownloadHistory history = new DownloadHistory();
        history.setUser(user);
        history.setApp(app);
        downloadHistoryRepository.save(history);

        // ✅ Increase download count
        app.setTotalDownloads(app.getTotalDownloads() + 1);
        appRepository.save(app);
        analyticsService.updateAppAnalytics(appId);
        
// ✅ ADD THIS LINE (CRITICAL ✅)
recommendationService.generateRecommendations(userId);

    }

    @Override
public Integer getDownloadCount(Long appId, Long developerId) {
        log.info("updateAppAnalytics service method called");

    App app = appRepository.findById(appId)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "App not found"));

    if (!app.getDeveloper().getId().equals(developerId)) {
        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Not your app");
    }

    return app.getTotalDownloads();
}




public List<DownloadResponseDTO> getUserDownloadedApps(Long userId) {

    List<DownloadHistory> downloads = 
         downloadHistoryRepository.findByUserId(userId);

    return downloads.stream()
        .map(d -> new DownloadResponseDTO(
            d.getApp().getId(),
            d.getApp().getAppName(),
            d.getApp().getAppLogoUrl(),
            d.getApp().getCategory()
        ))
        .distinct()
        .toList();
}

}