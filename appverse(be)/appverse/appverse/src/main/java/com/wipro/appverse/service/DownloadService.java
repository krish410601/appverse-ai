package com.wipro.appverse.service;

import java.util.List;
import com.wipro.appverse.dto.response.DownloadResponseDTO;


public interface DownloadService {
    void downloadApp(Long appId, Long userId);

    Integer getDownloadCount(Long id, Long developerId);

    List<DownloadResponseDTO> getUserDownloadedApps(Long userId);
}
