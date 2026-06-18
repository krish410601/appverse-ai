package com.wipro.appverse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.appverse.dto.request.AppVersionDTO;
import com.wipro.appverse.entity.AppVersion;
import com.wipro.appverse.service.AppVersionService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RestController
@RequestMapping("/appversion")
public class AppVersionController {

    @Autowired
    private AppVersionService appVersionService;

    @PreAuthorize("hasRole('DEVELOPER')")
@PostMapping("/developer/{id}/add-versions")
public String addVersion(
        @PathVariable Long id,
        @RequestBody AppVersionDTO dto) {
             log.info("add version method called");

    Long developerId = (Long) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

    appVersionService.addVersion(id, dto, developerId);
    return "Version added with release notes";
}

    @PreAuthorize("hasRole('DEVELOPER')")
@GetMapping("/developer/{id}/versions")
public List<AppVersion> getVersions(@PathVariable Long id) {
     log.info("get versions method called");

    Long developerId = (Long) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

    return appVersionService.getAppVersions(id, developerId);
}

@PreAuthorize("hasAnyRole('ADMIN','DEVELOPER')")
@GetMapping("/app/{appId}/versions")
public ResponseEntity<List<AppVersionDTO>> getVersionsByAppId(
        @PathVariable Long appId) {
             log.info("getVersionsByAppId method called");
    List<AppVersionDTO> versions = appVersionService.getVersionsByAppId(appId);

    return ResponseEntity.ok(versions);
}

}
