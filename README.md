# Gmail IMAP Viewer Backend

This is the backend service for the Gmail IMAP Viewer application. It connects to Gmail using the IMAP protocol and provides an API to interact with emails.

## Features

- Connect to Gmail using IMAP
- Fetch and display emails
- Search emails by various criteria
- Mark emails as read/unread

## Requirements

- Node.js
- npm
- Gmail account

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/gmail-imap-viewer-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd gmail-imap-viewer-backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add your Gmail credentials:
   ```
   EMAIL=your-email@gmail.com
   PASSWORD=your-password
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```
2. The server will be running at `http://localhost:3000`.

## API Endpoints

- `GET /emails` - Fetch all emails
- `GET /emails/:id` - Fetch a specific email by ID
- `POST /emails/search` - Search emails by criteria

## License

This project is licensed under the MIT License.
