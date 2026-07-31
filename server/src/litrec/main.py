from contextlib import asynccontextmanager

from fastapi import FastAPI
from sqlalchemy import text

from litrec.database.session import engine

app = FastAPI()



    

@asynccontextmanager
async def lifespan(app: FastAPI):
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    print("succesfully connected to PostgreSQL ")
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message":"LitRec API is running"}