package com.wipro.appverse.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wipro.appverse.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByAppId(Long appId);

    List<Review> findBySentiment(String sentiment);
    @Query("SELECT COUNT(r) FROM Review r WHERE r.app.id = :appId")
Integer countByAppId(Long appId);

    
 Optional<Review> findByUserIdAndAppId(Long userId, Long appId);

 List<Review> findByAppIdAndFakeReviewFlagFalse(Long appId);

   // List<Review> findByAppId(Long appId);
   long countByFakeReviewFlagTrue();

}
