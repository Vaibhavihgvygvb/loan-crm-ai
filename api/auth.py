from fastapi import APIRouter
from sqlalchemy.orm import Session
from api.database import SessionLocal
from api.models import User
from api.schemas import UserCreate, UserLogin

router = APIRouter(tags=["Authentication"])


@router.post("/register")
def register(user: UserCreate):
    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        return {
            "message": "User already exists"
        }

    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }


@router.post("/login")
def login(user: UserLogin):
    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        return {
            "message": "User not found"
        }

    if existing_user.password != user.password:
        return {
            "message": "Invalid password"
        }

    return {
        "message": "Login successful",
        "user_id": existing_user.id,
        "name": existing_user.name,
        "email": existing_user.email
    }