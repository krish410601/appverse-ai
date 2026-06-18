package com.wipro.appverse.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.wipro.appverse.dto.request.AppRequestDTO;

import com.wipro.appverse.dto.response.AppResponseDTO;
import com.wipro.appverse.service.AppService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/apps")
public class AppController {

    @Autowired
    private AppService appService;
   
    // ✅ USER – view approved apps
   @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping
    public List<AppResponseDTO> getApprovedApps() {
         log.info("app controller called");
         log.info("approved applist method called");
        return appService.getApprovedApps();
    }

    @PreAuthorize("hasRole('DEVELOPER')")
    @PostMapping("/create-app")
    public AppResponseDTO createApp(@RequestBody AppRequestDTO dto) {

    log.info("create app method called");

    Long developerId = (Long) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

    return appService.createApp(dto, developerId);
}


// ✅ ADMIN – get all pending apps
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/pending")
public ResponseEntity<List<AppResponseDTO>> getPendingApps() {
     log.info("getting list of pending apps method called");

    List<AppResponseDTO> apps = appService.getPendingApps();

    return ResponseEntity.ok(apps);
}


    

    // ✅ ADMIN – approve app
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/approve")
    public String approveApp(@PathVariable Long id) {
         log.info("approve app method called");
        appService.approveApp(id);
        return "App approved successfully";
    }

    // ✅ USER – browse & search apps (Play Store style)
@PreAuthorize("hasAnyRole('USER','ADMIN')")
@GetMapping("/search")
public List<AppResponseDTO> searchApps(
        @RequestParam(required = false) String query,
        @RequestParam(required = false) String category) {
             log.info("search app method called");

    return appService.searchApps(query, category);
}

// ✅ USER – filter by category only
@PreAuthorize("hasAnyRole('USER','ADMIN')")
@GetMapping("/category/{category}")
public List<AppResponseDTO> getAppsByCategory(
        @PathVariable String category) {
             log.info("get apps by category method called");

    return appService.searchApps(null, category);
}

@PreAuthorize("hasRole('DEVELOPER')")
@PutMapping("/developer/updateapp/{id}")
public AppResponseDTO updateApp(
        @PathVariable Long id,
        @RequestBody AppRequestDTO dto) {
             log.info("update app method called");

    Long developerId = (Long) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

    return appService.updateApp(id, dto, developerId);
}

@GetMapping("/categories")
public ResponseEntity<List<String>> getCategories() {
     log.info("categories method called");
    List<String> categories = appService.getAllCategories();
    return ResponseEntity.ok(categories);
}





@PreAuthorize("hasRole('DEVELOPER')")
@GetMapping("/developer/apps")
public List<AppResponseDTO> getMyApps() {
     log.info("app list for that dev method called");

    Long developerId = (Long) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

    return appService.getAppsByDeveloper(developerId);
}

@GetMapping("/trending")
public List<AppResponseDTO> getTrendingApps() {
     log.info("get trending apps method called");
    return appService.getTrendingApps();
}

@GetMapping("/editors-choice")
public List<AppResponseDTO> getEditorsChoiceApps() {
    log.info("get editing apps method called");
    return appService.getEditorsChoiceApps();
}


@GetMapping("/top-ai")
public List<AppResponseDTO> getTopAIApps() {
    log.info("getTopApps method called");
    return appService.getTopAIApps();
}

@PutMapping("/{id}/reject")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<String> rejectApp(@PathVariable Long id) {
     log.info("reject app method called");

    appService.rejectApp(id);

    return ResponseEntity.ok("App rejected successfully");
}

}
