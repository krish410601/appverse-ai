package com.wipro.appverse.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wipro.appverse.entity.App;
import com.wipro.appverse.enums.AppStatus;
import com.wipro.appverse.enums.CategoryType;

@Repository
public interface AppRepository extends JpaRepository<App, Long> {

    List<App> findByStatus(AppStatus status);
        long countByStatus(AppStatus status);
    List<App> findByCategory(CategoryType category);

    List<App> findByAppNameContainingIgnoreCase(String keyword);
    List<App> findByDeveloperId(Long developerId);

    //List<App> findByStatus(AppStatus status);
    
// ✅ Search by app name
    List<App> findByStatusAndAppNameContainingIgnoreCase(
            AppStatus status,
            String appName
    );

    // ✅ Filter by category
    List<App> findByStatusAndCategory(
            AppStatus status,
            CategoryType category
    );

    
// ✅ Search + category
    List<App> findByStatusAndCategoryAndAppNameContainingIgnoreCase(
            AppStatus status,
            CategoryType category,
            String appName
    );
    
  @Query("SELECT DISTINCT a.category FROM App a")
    List<String> findDistinctCategories();



    // ✅ Top downloads
List<App> findTop10ByStatusOrderByTotalDownloadsDesc(AppStatus status);

// ✅ Top rated
List<App> findTop10ByStatusOrderByAverageRatingDesc(AppStatus status);

// ✅ By category
List<App> findTop5ByCategoryAndStatusOrderByTotalDownloadsDesc(
        CategoryType category,
        AppStatus status
);
List<App> findByCategoryAndStatus(
    CategoryType category,
    AppStatus status
);


List<App>  findTop10ByCategoryAndStatusOrderByTotalDownloadsDesc(
            CategoryType category,
            AppStatus status
    );



}
