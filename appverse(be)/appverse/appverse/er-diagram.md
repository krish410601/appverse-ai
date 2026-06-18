```mermaid
erDiagram

USER ||--o{ APP : develops
USER ||--o{ REVIEW : writes
USER ||--o{ DOWNLOAD_HISTORY : downloads

APP ||--o{ REVIEW : has
APP ||--o{ APP_VERSION : contains
APP ||--|| ANALYTICS : has
APP ||--o{ DOWNLOAD_HISTORY : tracked_in

USER {
    Long id PK
    String full_name
}

APP {
    Long id PK
    String app_name
}