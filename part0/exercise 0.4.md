sequenceDiagram
    actor user
    participant browser
    participant server

    user->>browser: THE USER WRITES THE NEW NOTE
    user->>browser: THE USER CLICKS THE SAVE BUTTON
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->server: 302 REDIRECT POST
    deactivate server
    browser-->browser: Reload the page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: NOTES LIST
    deactivate server