package com.wipro.appverse.service;

import java.util.List;

import com.wipro.appverse.dto.request.AppVersionDTO;
import com.wipro.appverse.entity.AppVersion;

public interface AppVersionService {
    void addVersion(Long id, AppVersionDTO dto, Long developerId);

    List<AppVersion> getAppVersions(Long id, Long developerId);
    List<AppVersionDTO> getVersionsByAppId(Long appId);
}
