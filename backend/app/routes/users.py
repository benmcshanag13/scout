from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter()


class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    created_at: str
    report_count: int


@router.get("/me", response_model=UserResponse)
async def get_current_user():
    """Get authenticated user's profile"""
    # TODO: Implement get current user logic
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Get user endpoint not yet implemented",
    )


@router.put("/me", response_model=UserResponse)
async def update_user():
    """Update authenticated user's profile"""
    # TODO: Implement update user logic
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Update user endpoint not yet implemented",
    )


@router.get("/{user_id}", response_model=UserResponse)
async def get_user_by_id(user_id: str):
    """Get public user profile by ID"""
    # TODO: Implement get user by ID logic
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Get user by ID endpoint not yet implemented",
    )
