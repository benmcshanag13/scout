# Scout Architecture

This document outlines the architecture and design decisions for the Scout application.

## System Overview

Scout is a mobile-first application built with React Native for the frontend and FastAPI (Python) for the backend. The app enables real-time sharing of Myki inspector locations in Melbourne's public transport system.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Mobile App (React Native)             │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Profile    │  │     Map      │  │    Report    │  │
│  │   Screen     │  │    Screen    │  │    Screen    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         React Navigation (Tab Navigator)         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Zustand    │  │   Mapbox     │  │     API      │  │
│  │    Store     │  │     SDK      │  │   Service    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Backend API (FastAPI)                   │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Reports    │  │    Users     │  │     Auth     │  │
│  │   Routes     │  │   Routes     │  │   Routes     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Business Logic Layer                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │             Database Layer (ORM)                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │   PostgreSQL    │
                   │    Database     │
                   └─────────────────┘
```

## Frontend Architecture

### Technology Stack

- **React Native**: Cross-platform mobile framework
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library with tab-based navigation
- **Zustand**: Lightweight state management
- **Mapbox**: Maps and geolocation services
- **Axios**: HTTP client for API requests

### Component Structure

The frontend follows a feature-based folder structure:

```
src/
├── screens/           # Screen components (Profile, Map, Report)
├── components/        # Reusable UI components
├── navigation/        # Navigation configuration
├── store/            # Zustand stores
├── services/         # API clients and utilities
├── types/            # TypeScript type definitions
├── hooks/            # Custom React hooks
├── utils/            # Helper functions
└── assets/           # Static assets
```

### State Management

**Zustand Stores:**

1. **authStore**: User authentication state
   - User profile
   - Authentication tokens
   - Login/logout actions

2. **reportStore**: Inspector report state
   - Active reports
   - Report history
   - Submit report actions

3. **mapStore**: Map state
   - Current location
   - Visible markers
   - Map region/zoom level

### Navigation Flow

```
Tab Navigator
├── Profile Tab → ProfileScreen
├── Map Tab → MapScreen (Default)
└── Report Tab → ReportScreen
```

The app uses a Snapchat-like interface with horizontal swipe navigation between the three main screens.

## Backend Architecture

### Technology Stack

- **FastAPI**: Modern Python web framework
- **PostgreSQL**: Relational database
- **SQLAlchemy**: ORM for database operations
- **Pydantic**: Data validation and settings
- **Alembic**: Database migrations
- **Docker**: Containerization

### API Design

RESTful API with the following main endpoints:

#### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token

#### Users
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update user profile
- `GET /api/v1/users/{id}` - Get user by ID (public info)

#### Reports
- `GET /api/v1/reports` - Get active reports (with geolocation filters)
- `POST /api/v1/reports` - Submit new inspector report
- `GET /api/v1/reports/{id}` - Get report details
- `PUT /api/v1/reports/{id}/verify` - Verify a report (upvote)
- `DELETE /api/v1/reports/{id}` - Delete own report

### Database Schema

**Users Table:**
```sql
users
├── id (UUID, PK)
├── username (VARCHAR, UNIQUE)
├── email (VARCHAR, UNIQUE)
├── password_hash (VARCHAR)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── is_active (BOOLEAN)
```

**Reports Table:**
```sql
reports
├── id (UUID, PK)
├── user_id (UUID, FK → users.id)
├── latitude (DECIMAL)
├── longitude (DECIMAL)
├── location_name (VARCHAR)
├── transport_line (VARCHAR)
├── description (TEXT)
├── verification_count (INTEGER)
├── is_active (BOOLEAN)
├── created_at (TIMESTAMP)
└── expires_at (TIMESTAMP)
```

**Report Verifications Table:**
```sql
report_verifications
├── id (UUID, PK)
├── report_id (UUID, FK → reports.id)
├── user_id (UUID, FK → users.id)
└── created_at (TIMESTAMP)
```

## Key Design Decisions

### 1. Real-time Updates

**Decision**: Poll-based updates rather than WebSockets for MVP
**Rationale**:
- Simpler implementation
- Sufficient for use case (inspector locations don't change rapidly)
- Can upgrade to WebSockets later if needed

### 2. Report Expiration

**Decision**: Reports automatically expire after 2 hours
**Rationale**:
- Keeps map clean and relevant
- Inspector locations are time-sensitive
- Reduces database storage requirements

### 3. Verification System

**Decision**: Community-based verification (upvotes)
**Rationale**:
- Increases trust in reports
- Discourages spam
- Simple user interaction (one tap to verify)

### 4. Anonymous Reporting Option

**Decision**: Users can report anonymously (authenticated but not publicly linked)
**Rationale**:
- Encourages participation
- Privacy-conscious design
- Still prevents spam through authentication

### 5. Geolocation Privacy

**Decision**: Report locations are approximate (rounded to ~100m)
**Rationale**:
- Protects user privacy
- Sufficient accuracy for purpose
- Reduces tracking concerns

## Security Considerations

### Authentication
- JWT-based authentication
- Short-lived access tokens (15 minutes)
- Refresh tokens stored securely
- Password hashing with bcrypt

### API Security
- Rate limiting on all endpoints
- CORS configuration
- Input validation with Pydantic
- SQL injection protection via ORM

### Data Privacy
- Minimal personal data collection
- Location data anonymization
- GDPR compliance considerations
- User data deletion on request

## Performance Considerations

### Frontend
- Lazy loading of screens
- Marker clustering on map for many reports
- Optimized re-renders with React.memo
- Image optimization and caching

### Backend
- Database indexing on frequently queried fields
- Caching for active reports (Redis - future)
- Pagination for list endpoints
- Geospatial queries optimization

## Future Enhancements

1. **Push Notifications**: Alert users of nearby inspectors
2. **WebSocket Integration**: Real-time updates
3. **Analytics Dashboard**: User statistics and insights
4. **Social Features**: Following, friends, activity feed
5. **Route Planning**: Integration with public transport routes
6. **Offline Mode**: Cache reports for offline viewing
7. **Report Photos**: Allow image uploads with reports
8. **Gamification**: Points, badges, leaderboards

## Development Workflow

1. **Local Development**: React Native with Metro bundler
2. **Testing**: Android Studio emulator / physical device
3. **Backend Development**: Docker containers locally
4. **API Testing**: FastAPI's built-in Swagger UI
5. **Version Control**: Git with feature branches
6. **CI/CD**: GitHub Actions (to be configured)

## Deployment Strategy

### Mobile App
- **Android**: Google Play Store
- **iOS**: Apple App Store
- Over-the-air updates via Expo Updates (if using Expo)

### Backend
- **Container**: Docker image
- **Hosting**: Cloud provider (AWS/GCP/Azure)
- **Database**: Managed PostgreSQL service
- **CDN**: CloudFlare for static assets

## Monitoring and Logging

- Application logging with structured JSON logs
- Error tracking (Sentry - future integration)
- Performance monitoring (Firebase Performance - future)
- API analytics and metrics

---

This architecture is designed to be scalable, maintainable, and user-focused. As the project evolves, this document should be updated to reflect new decisions and changes.
