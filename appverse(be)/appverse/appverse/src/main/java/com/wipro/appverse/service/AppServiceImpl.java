package com.wipro.appverse.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wipro.appverse.dto.request.AppRequestDTO;
import com.wipro.appverse.dto.response.AppResponseDTO;
import com.wipro.appverse.entity.App;
import com.wipro.appverse.entity.User;
import com.wipro.appverse.enums.AppStatus;
import com.wipro.appverse.enums.CategoryType;
import com.wipro.appverse.repository.AppRepository;
import com.wipro.appverse.repository.ReviewRepository;
import com.wipro.appverse.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AppServiceImpl implements AppService {

    @Autowired
    private AppRepository appRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // ✅ DEVELOPER creates app (PENDING)
    @Override
public AppResponseDTO createApp(AppRequestDTO dto, Long developerId) {
    log.info("updateAppAnalytics service method called");

    User developer = userRepository.findById(developerId)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Developer not found"));

    App app = new App();
    app.setAppName(dto.getAppName());
    app.setAppDescription(dto.getAppDescription());
    app.setAppVersion(dto.getAppVersion());
    app.setAppLogoUrl(dto.getAppLogoUrl());
    app.setAppFileUrl(dto.getAppFileUrl());
    app.setCategory(dto.getCategory());

    app.setDeveloper(developer);   // ✅ STORED FROM JWT
    app.setStatus(AppStatus.PENDING);

    return mapToResponse(appRepository.save(app));
}

    // ✅ USER views only APPROVED apps
    @Override
    public List<AppResponseDTO> getApprovedApps() {
        log.info("getApprovedApps  service method called");

        return appRepository.findByStatus(AppStatus.APPROVED)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ✅ ADMIN approves app
    @Override
    public void approveApp(Long appId) {
        log.info("approveApp service method called");

        App app = appRepository.findById(appId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "App not found"));

        app.setStatus(AppStatus.APPROVED);
        appRepository.save(app);
    }

    // ✅ ENTITY → DTO mapping
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
        dto.setTotalReviews( reviewRepository.countByAppId(app.getId()));
        dto.setAppLogoUrl(app.getAppLogoUrl()); 
        return dto;
    }

    @Override
public List<AppResponseDTO> searchApps(String query, String category) {
    log.info("searchApps service method called");

    List<App> apps;

    if (query != null && category != null) {
        apps = appRepository
                .findByStatusAndCategoryAndAppNameContainingIgnoreCase(
                        AppStatus.APPROVED,
                        CategoryType.valueOf(category.toUpperCase()),
                        query
                );
    } else if (query != null) {
        apps = appRepository
                .findByStatusAndAppNameContainingIgnoreCase(
                        AppStatus.APPROVED,
                        query
                );
    } else if (category != null) {
        apps = appRepository
                .findByStatusAndCategory(
                        AppStatus.APPROVED,
                        CategoryType.valueOf(category.toUpperCase())
                );
    } else {
        apps = appRepository.findByStatus(AppStatus.APPROVED);
    }

    return apps.stream()
            .map(this::mapToResponse)
            .toList();
}

@Override
public AppResponseDTO updateApp(Long appId,
                                AppRequestDTO dto,
                                Long developerId) {
    log.info("updateApp service method called");

    App app = appRepository.findById(appId)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "App not found"));

    if (!app.getDeveloper().getId().equals(developerId)) {
        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Not your app");
    }

    app.setAppName(dto.getAppName());
    app.setAppDescription(dto.getAppDescription());
    app.setAppVersion(dto.getAppVersion());
    app.setAppLogoUrl(dto.getAppLogoUrl());
    app.setAppFileUrl(dto.getAppFileUrl());
    app.setCategory(dto.getCategory());
    

    // ✅ force re‑approval
    app.setStatus(AppStatus.PENDING);

    return mapToResponse(appRepository.save(app));
}

@Override
public List<AppResponseDTO> getAppsByDeveloper(Long developerId) {
    log.info("getAppsByDeveloper service method called");

    return appRepository.findByDeveloperId(developerId)
            .stream()
            .map(this::mapToResponse)
            .toList();
}
@Override
public List<String> getAllCategories() {
    log.info("getAllCategories service method called");
    return appRepository.findDistinctCategories();
}
@Override
public List<AppResponseDTO> getPendingApps() {
    log.info("getPendingsApps service method called");

    List<App> pendingApps = appRepository.findByStatus(AppStatus.PENDING);

    return pendingApps.stream()
            .map(this::mapToDTO)
            .toList();
}

private AppResponseDTO mapToDTO(App app) {

    AppResponseDTO dto = new AppResponseDTO();

    dto.setId(app.getId());
    dto.setAppName(app.getAppName());
    dto.setAppDescription(app.getAppDescription());
    dto.setAppVersion(app.getAppVersion());
    dto.setAppLogoUrl(app.getAppLogoUrl());
    //dto.setAppFileUrl(app.getAppFileUrl());
    dto.setCategory(app.getCategory());
    dto.setStatus(app.getStatus());
    dto.setAverageRating(app.getAverageRating());
    dto.setTotalDownloads(app.getTotalDownloads());
     dto.setTotalReviews( reviewRepository.countByAppId(app.getId()));

    return dto;
}

public List<AppResponseDTO> getTrendingApps() {
    return appRepository
            .findTop10ByStatusOrderByTotalDownloadsDesc(AppStatus.APPROVED)
            .stream()
            .map(this::mapToDTO)
            .toList();
}

@Override
public List<AppResponseDTO> getEditorsChoiceApps() {
    log.info("getEditorssChoiceApps service method called");

    return appRepository
        .findByCategoryAndStatus(
            CategoryType.EDITORS_CHOICE,
            AppStatus.APPROVED
        )
        .stream()
        .map(this::mapToDTO)
        .toList();
}
@Override
public List<AppResponseDTO> getTopAIApps() {
    log.info("getTpAIApps service method called");

    return appRepository
            .findTop10ByCategoryAndStatusOrderByTotalDownloadsDesc(
                    CategoryType.AI,
                    AppStatus.APPROVED
            )
            .stream()
            .map(this::mapToDTO)
            .toList();
}


@Override
public void rejectApp(Long appId) {
    log.info("rejectApp service method called");

    App app = appRepository.findById(appId)
        .orElseThrow(() -> new RuntimeException("App not found"));

    if (app.getStatus() != AppStatus.PENDING) {
        throw new RuntimeException("Only pending apps can be rejected");
    }

    app.setStatus(AppStatus.REJECTED);

    appRepository.save(app);
}

}
