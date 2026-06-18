package com.wipro.appverse.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminDashboardStatsDTO {

    private long totalApps;
    private long totalUsers;
    private long pendingApps;
    private long fakeReviews;
}
