package com.wipro.appverse.service;

import java.util.List;

import com.wipro.appverse.dto.response.AppResponseDTO;

public interface RecommendationService {

    
void generateRecommendations(Long userId);

    List<AppResponseDTO> getUserRecommendations(Long userId);

}
