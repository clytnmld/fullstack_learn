https://studies.cs.helsinki.fi/exampleapp/spa
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: data of the response {"message":"note created"}
    deactivate server
```