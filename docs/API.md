# Scout API Documentation

This document provides comprehensive documentation for the Scout backend API.

**Base URL**: `https://api.scout.app/api/v1` (production)
**Development URL**: `http://localhost:8000/api/v1`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Token Expiration
- **Access Token**: 15 minutes
- **Refresh Token**: 30 days

---

## Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

Create a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "user@example.com",
  "password": "string"
}
```

**Validation Rules:**
- Username: 3-30 characters, alphanumeric and underscores only
- Email: Valid email format
- Password: Minimum 8 characters

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "username": "string",
  "email": "user@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Errors:**
- `400 Bad Request`: Validation error
- `409 Conflict`: Username or email already exists

---

#### Login

```http
POST /auth/login
```

Authenticate user and receive access tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "string"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "user@example.com"
  }
}
```

**Errors:**
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Missing fields

---

#### Refresh Token

```http
POST /auth/refresh
```

Get a new access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "string"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

**Errors:**
- `401 Unauthorized`: Invalid or expired refresh token

---

### Users

#### Get Current User Profile

```http
GET /users/me
```

Get authenticated user's profile information.

**Headers:**
- `Authorization: Bearer <token>` (required)

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "username": "string",
  "email": "user@example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "report_count": 42,
  "verification_count": 128
}
```

**Errors:**
- `401 Unauthorized`: Missing or invalid token

---

#### Update User Profile

```http
PUT /users/me
```

Update authenticated user's profile.

**Headers:**
- `Authorization: Bearer <token>` (required)

**Request Body:**
```json
{
  "username": "new_username",
  "email": "newemail@example.com"
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "username": "new_username",
  "email": "newemail@example.com",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

**Errors:**
- `401 Unauthorized`: Missing or invalid token
- `409 Conflict`: Username or email already taken

---

#### Get User by ID

```http
GET /users/{user_id}
```

Get public profile information for a specific user.

**Parameters:**
- `user_id` (path): UUID of the user

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "username": "string",
  "created_at": "2024-01-15T10:30:00Z",
  "report_count": 42
}
```

**Errors:**
- `404 Not Found`: User does not exist

---

### Reports

#### Get Reports

```http
GET /reports
```

Retrieve active inspector reports with optional filters.

**Query Parameters:**
- `latitude` (optional): Center latitude for geolocation filter
- `longitude` (optional): Center longitude for geolocation filter
- `radius` (optional): Radius in kilometers (default: 5, max: 50)
- `limit` (optional): Number of results (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `min_verifications` (optional): Minimum verification count (default: 0)

**Example:**
```
GET /reports?latitude=-37.8136&longitude=144.9631&radius=10&limit=20
```

**Response:** `200 OK`
```json
{
  "reports": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "username": "reporter_name",
      "latitude": -37.8136,
      "longitude": 144.9631,
      "location_name": "Flinders Street Station",
      "transport_line": "Cranbourne/Pakenham",
      "description": "Multiple inspectors at platform 1",
      "verification_count": 5,
      "created_at": "2024-01-15T10:30:00Z",
      "expires_at": "2024-01-15T12:30:00Z",
      "distance_km": 0.5,
      "is_verified_by_me": false
    }
  ],
  "total": 15,
  "limit": 20,
  "offset": 0
}
```

**Errors:**
- `400 Bad Request`: Invalid parameters

---

#### Create Report

```http
POST /reports
```

Submit a new inspector report.

**Headers:**
- `Authorization: Bearer <token>` (required)

**Request Body:**
```json
{
  "latitude": -37.8136,
  "longitude": 144.9631,
  "location_name": "Flinders Street Station",
  "transport_line": "Cranbourne/Pakenham",
  "description": "Multiple inspectors at platform 1",
  "is_anonymous": false
}
```

**Validation:**
- Latitude: -90 to 90
- Longitude: -180 to 180
- Location name: Required, max 200 characters
- Transport line: Optional, max 100 characters
- Description: Optional, max 500 characters

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "latitude": -37.8136,
  "longitude": 144.9631,
  "location_name": "Flinders Street Station",
  "transport_line": "Cranbourne/Pakenham",
  "description": "Multiple inspectors at platform 1",
  "verification_count": 0,
  "is_active": true,
  "created_at": "2024-01-15T10:30:00Z",
  "expires_at": "2024-01-15T12:30:00Z"
}
```

**Errors:**
- `401 Unauthorized`: Missing or invalid token
- `400 Bad Request`: Invalid data
- `429 Too Many Requests`: Rate limit exceeded (max 10 reports per hour)

---

#### Get Report by ID

```http
GET /reports/{report_id}
```

Get detailed information about a specific report.

**Parameters:**
- `report_id` (path): UUID of the report

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "username": "reporter_name",
  "latitude": -37.8136,
  "longitude": 144.9631,
  "location_name": "Flinders Street Station",
  "transport_line": "Cranbourne/Pakenham",
  "description": "Multiple inspectors at platform 1",
  "verification_count": 5,
  "is_active": true,
  "created_at": "2024-01-15T10:30:00Z",
  "expires_at": "2024-01-15T12:30:00Z",
  "verified_by": [
    {
      "user_id": "uuid",
      "username": "verifier1",
      "verified_at": "2024-01-15T10:35:00Z"
    }
  ]
}
```

**Errors:**
- `404 Not Found`: Report does not exist

---

#### Verify Report

```http
PUT /reports/{report_id}/verify
```

Verify (upvote) a report to increase its credibility.

**Headers:**
- `Authorization: Bearer <token>` (required)

**Parameters:**
- `report_id` (path): UUID of the report

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "verification_count": 6,
  "is_verified_by_me": true
}
```

**Rules:**
- Users can only verify each report once
- Cannot verify own reports
- Can remove verification by calling again (toggle)

**Errors:**
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: Report does not exist
- `400 Bad Request`: Cannot verify own report

---

#### Delete Report

```http
DELETE /reports/{report_id}
```

Delete a report (only report creator can delete).

**Headers:**
- `Authorization: Bearer <token>` (required)

**Parameters:**
- `report_id` (path): UUID of the report

**Response:** `204 No Content`

**Errors:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Not the report creator
- `404 Not Found`: Report does not exist

---

## Rate Limiting

Rate limits are applied per user (authenticated) or IP address (unauthenticated):

- **Authentication endpoints**: 5 requests per minute
- **Report creation**: 10 reports per hour
- **Report verification**: 100 per hour
- **Read endpoints**: 100 requests per minute

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705320600
```

**Error Response:** `429 Too Many Requests`
```json
{
  "detail": "Rate limit exceeded. Try again in 45 seconds."
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "detail": "Error message description",
  "error_code": "ERROR_CODE",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `204 No Content`: Successful deletion
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., duplicate)
- `422 Unprocessable Entity`: Validation error
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

---

## Pagination

List endpoints support pagination:

**Request:**
```
GET /reports?limit=20&offset=40
```

**Response includes:**
```json
{
  "items": [...],
  "total": 150,
  "limit": 20,
  "offset": 40
}
```

---

## Interactive Documentation

When running the backend locally, interactive API documentation is available at:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## Webhooks (Future)

Webhook support for real-time notifications is planned for future releases.

---

## API Versioning

The API is versioned via URL path (`/api/v1/`). Breaking changes will result in a new version (`/api/v2/`), with v1 maintained for backward compatibility.

---

## Support

For API support or to report issues:
- GitHub Issues: https://github.com/yourusername/scout/issues
- Email: support@scout.app (coming soon)
