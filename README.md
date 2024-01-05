# Log Parser App

This project consists of a Node.js backend API for parsing log files and a React frontend for uploading log files and downloading parsed log messages.

## Backend

### Log Parser Backend

This Node.js backend API parses log files and returns filtered log messages based on error and warning levels.

#### Installation

1. Install Dependencies
   ```
   cd backend
   npm install
   ```
2. Build App
   ```
   npm run build
   ```
3. Start the server
   ```
   npm run start
   ```
   The server will be running at http://localhost:3001.

#### Testing

Run the unit tests using Jest:
```
npm test
```

#### API Endpoint
* POST /parse-log 
  * Accepts a log file (multipart/form-data) and returns parsed log messages in JSON format.

#### Dependencies
- **Express**: Web framework
- **Multer**: Middleware for handling file uploads
- **Jest**: Testing framework
- **Supertest**: Library for testing HTTP requests

## Frontend

### Log Parser Frontend
This React frontend allows users to upload log files, parse them using the backend API, and download the filtered log messages in JSON format.

#### Installation
1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Start the development server
    ```
   npm start
   ```
   The app will be running at http://localhost:3000.

#### Usage
- Open the app in your browser.
- Choose a log file using the file input.
- Click the "Upload and Download" button.
- If successful, a JSON file with filtered log messages will be downloaded.

#### Dependencies
- **React**: JavaScript library for building user interfaces
- **Axios**: Promise-based HTTP client for the browser and Node.js
- **Node.js**: JavaScript runtime