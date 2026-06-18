package com.wipro.appverse.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.wipro.appverse.enums.AppStatus;
import com.wipro.appverse.enums.CategoryType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "apps")
@Data
@NoArgsConstructor
public class App {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String appName;

    @Column(columnDefinition = "TEXT")
    private String appDescription;

    private String appVersion;
    private String appLogoUrl;
    private String appFileUrl;

    @Enumerated(EnumType.STRING)
    private CategoryType category;

    @Enumerated(EnumType.STRING)
    private AppStatus status = AppStatus.PENDING;

    private Double averageRating = 0.0;
    private Integer totalDownloads = 0;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "developer_id")
    private User developer;

    @OneToMany(mappedBy = "app", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Review> reviews;

    @OneToMany(mappedBy = "app", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<DownloadHistory> downloads;

    @OneToMany(mappedBy = "app", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<AppVersion> versions;

    @OneToOne(mappedBy = "app", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private Analytics analytics;
}