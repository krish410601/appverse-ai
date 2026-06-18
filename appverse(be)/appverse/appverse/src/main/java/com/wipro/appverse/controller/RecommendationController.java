package com.wipro.appverse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.appverse.dto.response.AppResponseDTO;
import com.wipro.appverse.service.RecommendationService;

@RestController
@RequestMapping("/recommend")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    // ✅ GET recommendations (MAIN API FOR FE)
    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public List<AppResponseDTO> getRecommendations() {

        Long userId = (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return recommendationService.getUserRecommendations(userId);
    }

    
}

