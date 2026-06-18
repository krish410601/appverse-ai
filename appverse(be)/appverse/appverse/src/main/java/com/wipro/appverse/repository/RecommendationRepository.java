package com.wipro.appverse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.appverse.entity.Recommendation;

@Repository
public interface RecommendationRepository
        extends JpaRepository<Recommendation, Long> {

    List<Recommendation> findByUserId(Long userId);

    void deleteByUserId(Long userId);
}
