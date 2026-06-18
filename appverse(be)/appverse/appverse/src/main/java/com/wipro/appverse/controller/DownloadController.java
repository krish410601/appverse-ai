package com.wipro.appverse.controller;


import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication; 
import com.wipro.appverse.dto.response.DownloadResponseDTO;
import com.wipro.appverse.service.DownloadService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/downloads")
public class DownloadController {

    @Autowired
    private DownloadService downloadService;

    

    // ✅ USER downloads app
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{appId}")
    public String downloadApp(
            @PathVariable Long appId,
            Principal principal) {
             log.info("downloadapp method called");
        Long userId = (Long) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        downloadService.downloadApp(appId, userId);
        return "App downloaded successfully";
    }

    @GetMapping("/download-history")
public ResponseEntity<List<DownloadResponseDTO>> getDownloads(Authentication auth) {
     log.info("getDownloads method called");

    Long userId = (Long) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    System.out.println("value from local storage"+userId);

    List<DownloadResponseDTO> apps = downloadService.getUserDownloadedApps(userId);

    return ResponseEntity.ok(apps);
}



@PreAuthorize("hasRole('DEVELOPER')")
@GetMapping("/developer/{id}/getdownloadcount")
public Integer getDownloadCount(@PathVariable Long id, HttpServletRequest request) {
     log.info("getDownloadCount method called");

    String token = request.getHeader("Authorization").substring(7);

    Claims claims = Jwts.parser()
            .setSigningKey("appverse-super-secret-key-256-bits-long!!".getBytes())
            .parseClaimsJws(token)
            .getBody();

    Long developerId = ((Number) claims.get("uid")).longValue();

    return downloadService.getDownloadCount(id, developerId);
}


}
