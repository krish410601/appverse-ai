package com.wipro.appverse.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.appverse.entity.App;
import com.wipro.appverse.entity.AppVersion;

@Repository
public interface AppVersionRepository
        extends JpaRepository<AppVersion, Long> {
            List<AppVersion> findByApp(App app);

            List<AppVersion> findByAppId(Long appId);
}
