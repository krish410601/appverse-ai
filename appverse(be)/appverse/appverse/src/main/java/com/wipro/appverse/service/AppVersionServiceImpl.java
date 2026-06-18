package com.wipro.appverse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wipro.appverse.dto.request.AppVersionDTO;
import com.wipro.appverse.entity.App;
import com.wipro.appverse.entity.AppVersion;
import com.wipro.appverse.enums.AppStatus;
import com.wipro.appverse.repository.AppRepository;
import com.wipro.appverse.repository.AppVersionRepository;

@Service
public class AppVersionServiceImpl implements AppVersionService {
    @Autowired
    private AppVersionRepository appVersionRepository;

      @Autowired
    private AppRepository appRepository;

    @Override
public void addVersion(Long appId,
                       AppVersionDTO dto,
                       Long developerId) {

    App app = appRepository.findById(appId)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "App not found"));

    if (!app.getDeveloper().getId().equals(developerId)) {
        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Not your app");
    }

    AppVersion version = new AppVersion();
    version.setId(dto.getId());
    version.setVersionNumber(dto.getVersionNumber());
    version.setReleaseNotes(dto.getReleaseNotes());
    version.setApp(app);

    appVersionRepository.save(version);

    // ✅ force admin re‑approval
    app.setStatus(AppStatus.PENDING);
    appRepository.save(app);
}

@Override
public List<AppVersion> getAppVersions(Long appId, Long developerId) {

    App app = appRepository.findById(appId)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "App not found"));

    if (!app.getDeveloper().getId().equals(developerId)) {
        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Not your app");
    }

    return appVersionRepository.findByApp(app);
}

@Override
public List<AppVersionDTO> getVersionsByAppId(Long appId) {

    List<AppVersion> versions = appVersionRepository.findByAppId(appId);

    return versions.stream()
            .map(this::mapToDTO)
            .toList();
}
private AppVersionDTO mapToDTO(AppVersion v) {

    AppVersionDTO dto = new AppVersionDTO();

    dto.setId(v.getId());
    dto.setVersionNumber(v.getVersionNumber());
    dto.setReleaseNotes(v.getReleaseNotes());
   // dto.setCreatedAt(v.getCreatedAt());

    return dto;
}

}
