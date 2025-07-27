from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Muhammad Salman Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Pydantic models for the portfolio

# Contact Models
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    status: str = "new"
    createdAt: datetime

# Project Models
class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=10, max_length=500)
    technologies: List[str] = Field(..., min_items=1)
    category: str = Field(..., min_length=3, max_length=50)
    bgColor: str = Field(default="bg-blue-100")
    textColor: str = Field(default="text-blue-900")
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    featured: bool = Field(default=False)

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    category: Optional[str] = None
    bgColor: Optional[str] = None
    textColor: Optional[str] = None
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    featured: Optional[bool] = None

class ProjectResponse(BaseModel):
    id: str
    title: str
    description: str
    technologies: List[str]
    category: str
    bgColor: str
    textColor: str
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    featured: bool
    createdAt: datetime
    updatedAt: datetime

# Legacy status check models (keeping for compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    return doc

# Routes

@api_router.get("/")
async def root():
    return {"message": "Muhammad Salman Portfolio API", "version": "1.0.0"}

# Contact endpoints
@api_router.post("/contact", response_model=ContactResponse)
async def create_contact(contact: ContactCreate):
    try:
        contact_dict = contact.dict()
        contact_dict["status"] = "new"
        contact_dict["createdAt"] = datetime.utcnow()
        
        result = await db.contacts.insert_one(contact_dict)
        created_contact = await db.contacts.find_one({"_id": result.inserted_id})
        
        return ContactResponse(**serialize_doc(created_contact))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating contact: {str(e)}")

@api_router.get("/contact", response_model=List[ContactResponse])
async def get_contacts():
    try:
        contacts = await db.contacts.find().sort("createdAt", -1).to_list(1000)
        return [ContactResponse(**serialize_doc(contact)) for contact in contacts]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contacts: {str(e)}")

@api_router.get("/contact/{contact_id}", response_model=ContactResponse)
async def get_contact(contact_id: str):
    try:
        contact = await db.contacts.find_one({"_id": ObjectId(contact_id)})
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        return ContactResponse(**serialize_doc(contact))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact: {str(e)}")

# Project endpoints
@api_router.post("/projects", response_model=ProjectResponse)
async def create_project(project: ProjectCreate):
    try:
        project_dict = project.dict()
        project_dict["createdAt"] = datetime.utcnow()
        project_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.projects.insert_one(project_dict)
        created_project = await db.projects.find_one({"_id": result.inserted_id})
        
        return ProjectResponse(**serialize_doc(created_project))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating project: {str(e)}")

@api_router.get("/projects", response_model=List[ProjectResponse])
async def get_projects():
    try:
        projects = await db.projects.find().sort("createdAt", -1).to_list(1000)
        return [ProjectResponse(**serialize_doc(project)) for project in projects]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching projects: {str(e)}")

@api_router.get("/projects/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str):
    try:
        project = await db.projects.find_one({"_id": ObjectId(project_id)})
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        return ProjectResponse(**serialize_doc(project))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching project: {str(e)}")

@api_router.put("/projects/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: str, project: ProjectUpdate):
    try:
        project_dict = {k: v for k, v in project.dict().items() if v is not None}
        project_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.projects.update_one(
            {"_id": ObjectId(project_id)},
            {"$set": project_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        
        updated_project = await db.projects.find_one({"_id": ObjectId(project_id)})
        return ProjectResponse(**serialize_doc(updated_project))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating project: {str(e)}")

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    try:
        result = await db.projects.delete_one({"_id": ObjectId(project_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        return {"message": "Project deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting project: {str(e)}")

@api_router.get("/projects/category/{category}", response_model=List[ProjectResponse])
async def get_projects_by_category(category: str):
    try:
        projects = await db.projects.find({"category": category}).sort("createdAt", -1).to_list(1000)
        return [ProjectResponse(**serialize_doc(project)) for project in projects]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching projects by category: {str(e)}")

# Legacy status check endpoints (keeping for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
