package com.wipro.appverse.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AppVersionDTO {
    private Long id;
private String versionNumber;
    private String releaseNotes;

}
