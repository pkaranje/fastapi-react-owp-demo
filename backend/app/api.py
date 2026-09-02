from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

class Todo(BaseModel):
    id: str
    item: str
    completed: bool = False

todos: List[Todo] = [
    Todo(id="1", item="Read a book.", completed=False),
    Todo(id="2", item="Cycle around town.", completed=True)
]

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    return { "data": todos }

@app.post("/todo", tags=["todos"])
async def add_todo(todo: Todo) -> dict:
    todos.append(todo)
    return {
        "data": "Todo added."
    }

@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: str, body: dict) -> dict:
    for todo in todos:
        if todo.id == id:
            if "item" in body:
                todo.item = body["item"]
            if "completed" in body:
                todo.completed = body["completed"]
            return {
                "data": f"Todo with id {id} has been updated."
            }
    return {
        "data": f"Todo with id {id} not found."
    }

@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: str) -> dict:
    for todo in todos:
        if todo.id == id:
            todos.remove(todo)
            return {
                "data": f"Todo with id {id} has been removed."
            }
    return {
        "data": f"Todo with id {id} not found."
    }
