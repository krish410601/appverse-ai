package com.wipro.appverse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.wipro.appverse.entity.Analytics;
import com.wipro.appverse.repository.AnalyticsRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/analytics")
public class AnalyticsController {
    
    @Autowired
    private AnalyticsRepository analyticsRepository;

    @GetMapping("/app/{appId}")
public Analytics getAppAnalytics(@PathVariable Long appId) {
    log.info("Analytics controller called");

    return analyticsRepository.findByAppId(appId)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Analytics not found"));
}
}
