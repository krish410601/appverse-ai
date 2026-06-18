```mermaid
flowchart TD

USER[User] --> LOGIN[Authentication]
LOGIN --> USERDB[(User DB)]

USER --> VIEW[View Apps]
VIEW --> APPDB[(App DB)]

DEVELOPER[Developer] --> UPLOAD[Upload App]
UPLOAD --> APPDB

USER --> REVIEW[Add Review]
REVIEW --> REVIEWDB[(Review DB)]

ADMIN[Admin] --> ANALYTICS[View Analytics]
ANALYTICS --> ANALYTICDB[(Analytics DB)]