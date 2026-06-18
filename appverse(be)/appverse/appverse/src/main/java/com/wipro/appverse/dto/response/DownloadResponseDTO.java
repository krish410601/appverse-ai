package com.wipro.appverse.dto.response;


import java.time.LocalDateTime;

import com.wipro.appverse.enums.CategoryType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DownloadResponseDTO {

    private Long id;
    private String appName;
    //private LocalDateTime downloadedAt;
    
private String logo;
    private CategoryType category;


    // getters & setters
}
