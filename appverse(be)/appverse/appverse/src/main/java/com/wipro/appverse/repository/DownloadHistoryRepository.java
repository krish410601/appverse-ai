package com.wipro.appverse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.appverse.entity.DownloadHistory;

@Repository
public interface DownloadHistoryRepository
        extends JpaRepository<DownloadHistory, Long> {

    List<DownloadHistory> findByUserId(Long userId);

    List<DownloadHistory> findByAppId(Long appId);
}