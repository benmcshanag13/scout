# Scout Backend API

FastAPI backend for the Scout application.

## Quick Start with Docker

The easiest way to run the backend is using Docker Compose:

```bash
cd backend
docker-compose up
```

This will start:
- PostgreSQL database on port 5432
- FastAPI application on port 8000

API Documentation will be available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Manual Setup

### Prerequisites

- Python 3.11 or higher
- PostgreSQL 15 or higher

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run the application:
```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## Project Structure

```
backend/
├── app/
│   ├── main.py              # Application entry point
│   ├── routes/              # API endpoints
│   │   ├── auth.py          # Authentication routes
│   │   ├── users.py         # User routes
│   │   └── reports.py       # Report routes
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   └── database/            # Database configuration
├── requirements.txt         # Python dependencies
├── Dockerfile              # Docker configuration
└── docker-compose.yml      # Docker Compose setup
```

## Database Migrations

Alembic is used for database migrations:

```bash
# Create a new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

## Testing

Run tests with pytest:

```bash
pytest
```

## API Documentation

Once the server is running, interactive API documentation is available at:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

See also: [docs/API.md](../docs/API.md) for detailed endpoint documentation.

## Environment Variables

See `.env.example` for all available configuration options.

## Development

The application runs in reload mode during development, automatically restarting when code changes are detected.

## Production Deployment

For production:

1. Set `DEBUG=False` in environment variables
2. Use a production-grade WSGI server (already using uvicorn)
3. Configure proper CORS origins
4. Use a managed PostgreSQL database
5. Set a secure `SECRET_KEY`
6. Enable HTTPS
