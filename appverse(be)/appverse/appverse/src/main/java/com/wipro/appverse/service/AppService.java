package com.wipro.appverse.service;

import java.util.List;
import com.wipro.appverse.dto.request.AppRequestDTO;
import com.wipro.appverse.dto.response.AppResponseDTO;

public interface AppService {

    // DEVELOPER
    AppResponseDTO createApp(AppRequestDTO dto, Long userId);

    // USER
    List<AppResponseDTO> getApprovedApps();

    // ADMIN
    void approveApp(Long appId);

    List<AppResponseDTO> searchApps(String query, String category);

    AppResponseDTO updateApp(Long id, AppRequestDTO dto, Long developerId);

    List<AppResponseDTO> getAppsByDeveloper(Long developerId);

    List<String> getAllCategories();

    List<AppResponseDTO> getPendingApps();

    
    List<AppResponseDTO> getTrendingApps();
    List<AppResponseDTO> getEditorsChoiceApps();

    List<AppResponseDTO> getTopAIApps();

    void rejectApp(Long id);
    
}
