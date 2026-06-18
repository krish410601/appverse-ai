package com.wipro.appverse.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.appverse.entity.Analytics;

@Repository
public interface AnalyticsRepository
        extends JpaRepository<Analytics, Long> {

    Optional<Analytics> findByAppId(Long appId);
}
