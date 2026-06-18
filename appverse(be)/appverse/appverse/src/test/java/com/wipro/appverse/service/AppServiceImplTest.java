package com.wipro.appverse.service;


import com.wipro.appverse.dto.request.AppRequestDTO;
import com.wipro.appverse.dto.response.AppResponseDTO;
import com.wipro.appverse.entity.App;
import com.wipro.appverse.entity.User;
import com.wipro.appverse.enums.AppStatus;
import com.wipro.appverse.enums.CategoryType;
import com.wipro.appverse.repository.AppRepository;
import com.wipro.appverse.repository.ReviewRepository;
import com.wipro.appverse.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class AppServiceImplTest {

    @Mock
    private AppRepository appRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private AppServiceImpl appService;

    private User developer;
    private App app;

    @BeforeEach
    void setup() {

        developer = new User();
        developer.setId(1L);

        app = new App();
        app.setId(1L);
        app.setAppName("Test App");
        app.setCategory(CategoryType.AI);
        app.setStatus(AppStatus.PENDING);
        app.setDeveloper(developer);
    }

    // =========================
    // ✅ TEST: CREATE APP
    // =========================
    @Test
    void testCreateApp() {

        AppRequestDTO dto = new AppRequestDTO();
        dto.setAppName("Test App");
        dto.setCategory(CategoryType.AI);

        when(userRepository.findById(1L)).thenReturn(Optional.of(developer));
        when(appRepository.save(any(App.class))).thenReturn(app);
        when(reviewRepository.countByAppId(anyLong())).thenReturn(0);

        AppResponseDTO response = appService.createApp(dto, 1L);

        assertNotNull(response);
        assertEquals("Test App", response.getAppName());

        verify(appRepository, times(1)).save(any(App.class));
    }

    // =========================
    // ✅ TEST: APPROVE APP
    // =========================
    @Test
    void testApproveApp() {

        when(appRepository.findById(1L)).thenReturn(Optional.of(app));

        appService.approveApp(1L);

        assertEquals(AppStatus.APPROVED, app.getStatus());
        verify(appRepository).save(app);
    }

    // =========================
    // ✅ TEST: UPDATE APP (SUCCESS)
    // =========================
    @Test
    void testUpdateApp_Success() {

        AppRequestDTO dto = new AppRequestDTO();
        dto.setAppName("Updated App");
        dto.setAppDescription("Updated Desc");
        dto.setAppVersion("2.0");
        dto.setAppLogoUrl("logo.png");
        dto.setAppFileUrl("file.apk");
        dto.setCategory(CategoryType.AI);

        when(appRepository.findById(1L)).thenReturn(Optional.of(app));
        when(appRepository.save(any(App.class))).thenReturn(app);
        when(reviewRepository.countByAppId(anyLong())).thenReturn(0);

        AppResponseDTO response =
                appService.updateApp(1L, dto, 1L);

        assertEquals("Updated App", response.getAppName());
        assertEquals(AppStatus.PENDING, response.getStatus());

        verify(appRepository).save(app);
    }

    // =========================
    // ✅ TEST: UPDATE APP (FORBIDDEN)
    // =========================
    @Test
    void testUpdateApp_NotOwner() {

        User otherUser = new User();
        otherUser.setId(999L);
        app.setDeveloper(otherUser);

        when(appRepository.findById(1L)).thenReturn(Optional.of(app));

        assertThrows(Exception.class, () ->
                appService.updateApp(1L, new AppRequestDTO(), 1L)
        );
    }

    // =========================
    // ✅ TEST: GET APPROVED APPS
    // =========================
    @Test
    void testGetApprovedApps() {

        app.setStatus(AppStatus.APPROVED);

        when(appRepository.findByStatus(AppStatus.APPROVED))
                .thenReturn(List.of(app));

        when(reviewRepository.countByAppId(anyLong())).thenReturn(2);

        List<AppResponseDTO> result = appService.getApprovedApps();

        assertEquals(1, result.size());
        assertEquals("Test App", result.get(0).getAppName());
    }

    // =========================
    // ✅ TEST: REJECT APP
    // =========================
    @Test
    void testRejectApp() {

        when(appRepository.findById(1L)).thenReturn(Optional.of(app));

        appService.rejectApp(1L);

        assertEquals(AppStatus.REJECTED, app.getStatus());
        verify(appRepository).save(app);
    }

}
