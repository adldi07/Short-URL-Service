# Short URL Service

This is a Node.js application for creating and managing short URLs. It includes user authentication and role-based access control.

## Installation

1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the MongoDB server.
4. Run the application:
    ```bash
    npm start
    ```

## Routes

### User Routes

#### POST /user
- **Description**: Handle user signup.
- **Request Body**:
    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
    ```
- **Response**: Redirects to the login page.

#### POST /user/login
- **Description**: Handle user login.
- **Request Body**:
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
- **Response**: Sets a cookie with the JWT token and redirects to the home page.

### URL Routes

#### POST /url
- **Description**: Generate a new short URL.
- **Request Body**:
    ```json
    {
        "url": "string"
    }
    ```
- **Response**: Renders the home page with the new short ID.

#### GET /url/:shortId
- **Description**: Redirect to the original URL.
- **Parameters**:
    - `shortId`: The short ID of the URL.
- **Response**: Redirects to the original URL.

#### GET /url/analytics/:shortId
- **Description**: Get analytics for a short URL.
- **Parameters**:
    - `shortId`: The short ID of the URL.
- **Response**: JSON object with analytics data.

### Static Routes

#### GET /admin/urls
- **Description**: Get all URLs (Admin only).
- **Response**: Renders the home page with all URLs.

#### GET /
- **Description**: Get URLs created by the logged-in user.
- **Response**: Renders the home page with the user's URLs.

#### GET /signup
- **Description**: Render the signup page.
- **Response**: Renders the signup page.

#### GET /login
- **Description**: Render the login page.
- **Response**: Renders the login page.

## Middleware

### restrictToLoggedinUserOnly
- **Description**: Restricts access to logged-in users only.

### checkAuth
- **Description**: Checks if the user is authenticated.

### checkForAuthentication
- **Description**: Checks for authentication and sets the user in the request.

### restrictTo
- **Description**: Restricts access based on user roles.

## Models

### User Model
- **Fields**:
    - `name`: String, required.
    - `email`: String, required, unique.
    - `role`: String, required, default: "NORMAL".
    - `password`: String, required.

### URL Model
- **Fields**:
    - `shortId`: String, required, unique.
    - `redirectURL`: String, required.
    - `visitHistory`: Array of timestamps.
    - `createdBy`: ObjectId, reference to User.

## License

This project is licensed under the MIT License.