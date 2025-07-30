from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
import uuid

from .auth import get_current_user
from .database import get_db_connection

router = APIRouter()

class PricingPackage(BaseModel):
    name: str
    price: float
    description: str
    features: list[str]
    delivery_days: int
    revisions: int

class FreelancerPricingUpdate(BaseModel):
    hourly_rate: Optional[float] = None
    pricing: Optional[dict] = None

class FreelancerPricingResponse(BaseModel):
    id: str
    freelancer_id: str
    basic_package: Optional[dict] = None
    standard_package: Optional[dict] = None
    premium_package: Optional[dict] = None
    created_at: datetime
    updated_at: datetime

@router.get("/freelancers/{freelancer_id}/pricing")
async def get_freelancer_pricing(
    freelancer_id: str,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db_connection)
):
    """Get freelancer pricing information"""
    try:
        # Get pricing from the freelancer_pricing table
        result = db.table('freelancer_pricing').select('*').eq('freelancer_id', freelancer_id).single().execute()
        
        if result.data:
            return result.data
        else:
            # Return empty pricing if not found
            return {
                "freelancer_id": freelancer_id,
                "basic_package": None,
                "standard_package": None,
                "premium_package": None
            }
    except Exception as e:
        if "No rows found" in str(e):
            return {
                "freelancer_id": freelancer_id,
                "basic_package": None,
                "standard_package": None,
                "premium_package": None
            }
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/freelancers/{freelancer_id}/pricing")
async def update_freelancer_pricing(
    freelancer_id: str,
    pricing_data: FreelancerPricingUpdate,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db_connection)
):
    """Update freelancer pricing information"""
    try:
        # Check if the freelancer belongs to the current user
        freelancer_result = db.table('freelancers').select('user_id').eq('freelancer_id', freelancer_id).single().execute()
        
        if not freelancer_result.data:
            raise HTTPException(status_code=404, detail="Freelancer not found")
            
        if freelancer_result.data['user_id'] != current_user['user_id']:
            raise HTTPException(status_code=403, detail="Not authorized to update this freelancer's pricing")
        
        # Update hourly rate in the freelancers table
        if pricing_data.hourly_rate is not None:
            db.table('freelancers').update({
                'hourly_rate': pricing_data.hourly_rate
            }).eq('freelancer_id', freelancer_id).execute()
        
        # Update pricing packages in the freelancer_pricing table
        if pricing_data.pricing is not None:
            pricing_record = {
                'freelancer_id': freelancer_id,
                'basic_package': pricing_data.pricing.get('basic_package'),
                'standard_package': pricing_data.pricing.get('standard_package'),
                'premium_package': pricing_data.pricing.get('premium_package'),
                'updated_at': datetime.utcnow().isoformat()
            }
            
            # Check if pricing record exists
            existing = db.table('freelancer_pricing').select('id').eq('freelancer_id', freelancer_id).execute()
            
            if existing.data:
                # Update existing record
                result = db.table('freelancer_pricing').update(pricing_record).eq('freelancer_id', freelancer_id).execute()
            else:
                # Insert new record
                pricing_record['id'] = str(uuid.uuid4())
                pricing_record['created_at'] = datetime.utcnow().isoformat()
                result = db.table('freelancer_pricing').insert(pricing_record).execute()
        
        # Return the updated freelancer profile with pricing
        updated_freelancer = db.table('freelancers').select(
            '*',
            'freelancer_pricing(*)'
        ).eq('freelancer_id', freelancer_id).single().execute()
        
        # Merge pricing data into the response
        if updated_freelancer.data:
            freelancer_data = updated_freelancer.data
            if 'freelancer_pricing' in freelancer_data and freelancer_data['freelancer_pricing']:
                pricing = freelancer_data['freelancer_pricing']
                freelancer_data['pricing'] = {
                    'basic_package': pricing.get('basic_package'),
                    'standard_package': pricing.get('standard_package'),
                    'premium_package': pricing.get('premium_package')
                }
            return freelancer_data
        
        raise HTTPException(status_code=404, detail="Freelancer not found after update")
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/freelancers/{freelancer_id}/pricing")
async def delete_freelancer_pricing(
    freelancer_id: str,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db_connection)
):
    """Delete freelancer pricing information"""
    try:
        # Check if the freelancer belongs to the current user
        freelancer_result = db.table('freelancers').select('user_id').eq('freelancer_id', freelancer_id).single().execute()
        
        if not freelancer_result.data:
            raise HTTPException(status_code=404, detail="Freelancer not found")
            
        if freelancer_result.data['user_id'] != current_user['user_id']:
            raise HTTPException(status_code=403, detail="Not authorized to delete this freelancer's pricing")
        
        # Delete pricing record
        db.table('freelancer_pricing').delete().eq('freelancer_id', freelancer_id).execute()
        
        # Reset hourly rate in freelancers table
        db.table('freelancers').update({
            'hourly_rate': None
        }).eq('freelancer_id', freelancer_id).execute()
        
        return {"message": "Pricing deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
