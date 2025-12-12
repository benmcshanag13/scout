from fastapi import APIRouter, HTTPException, status, Query
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()


class CreateReportRequest(BaseModel):
    latitude: float
    longitude: float
    location_name: str
    transport_line: Optional[str] = None
    description: Optional[str] = None
    is_anonymous: bool = False


class ReportResponse(BaseModel):
    id: str
    user_id: str
    username: str
    latitude: float
    longitude: float
    location_name: str
    transport_line: Optional[str]
    description: Optional[str]
    verification_count: int
    created_at: str
    expires_at: str
    is_verified_by_me: bool


class ReportsListResponse(BaseModel):
    reports: List[ReportResponse]
    total: int
    limit: int
    offset: int


@router.get("", response_model=ReportsListResponse)
async def get_reports(
    latitude: Optional[float] = Query(None),
    longitude: Optional[float] = Query(None),
    radius: Optional[float] = Query(5.0),
    limit: int = Query(50, le=100),
    offset: int = Query(0, ge=0),
    min_verifications: int = Query(0, ge=0),
):
    """Get active inspector reports with optional filters"""
    # TODO: Implement get reports logic with geolocation filtering
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Get reports endpoint not yet implemented",
    )


@router.post("", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
async def create_report(data: CreateReportRequest):
    """Submit a new inspector report"""
    # TODO: Implement create report logic
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Create report endpoint not yet implemented",
    )


@router.get("/{report_id}", response_model=ReportResponse)
async def get_report_by_id(report_id: str):
    """Get detailed information about a specific report"""
    # TODO: Implement get report by ID logic
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Get report by ID endpoint not yet implemented",
    )


@router.put("/{report_id}/verify")
async def verify_report(report_id: str):
    """Verify (upvote) a report"""
    # TODO: Implement verify report logic
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Verify report endpoint not yet implemented",
    )


@router.delete("/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_report(report_id: str):
    """Delete a report (only report creator)"""
    # TODO: Implement delete report logic
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Delete report endpoint not yet implemented",
    )
