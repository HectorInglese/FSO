sequenceDiagram
    actor user
    participant browser
    participant server

    user->>browser: THE USER WRITES THE NEW NOTE
    user->>browser: THE USER CLICKS THE SAVE BUTTON
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->server: 201 Created
    deactivate server

    browser->>browser: RUN THE NOTES RENDERING
    activate browser
    browser-->browser: RERUN THE NOTES RENDERING