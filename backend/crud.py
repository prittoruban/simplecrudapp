from sqlalchemy.orm import Session
import models, schemas

def get_students(db: Session):
    return db.query(models.Student).all()

def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def update_student(db: Session, id: int, student: schemas.StudentCreate):
    db_student = db.query(models.Student).filter(models.Student.id == id).first()
    if db_student:
        db_student.name = student.name
        db_student.age = student.age
        db_student.course = student.course
        db.commit()
        db.refresh(db_student)
    return db_student

def delete_student(db: Session, id: int):
    db_student = db.query(models.Student).filter(models.Student.id == id).first()
    if db_student:
        db.delete(db_student)
        db.commit()
    return db_student
