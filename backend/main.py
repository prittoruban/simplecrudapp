from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas, crud
from database import Base, engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


@app.on_event("startup")
def on_startup():
    # Create DB tables at application startup (runs after imports).
    # Keeps import-time side-effects out of the module and works better
    # with development reloader subprocesses.
    Base.metadata.create_all(bind=engine)

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/students", response_model=list[schemas.Student])
def read_students(db: Session = Depends(get_db)):
    return crud.get_students(db)

@app.post("/students", response_model=schemas.Student)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.create_student(db, student)

@app.put("/students/{id}", response_model=schemas.Student)
def update_student(id: int, student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.update_student(db, id, student)

@app.delete("/students/{id}")
def delete_student(id: int, db: Session = Depends(get_db)):
    return crud.delete_student(db, id)
