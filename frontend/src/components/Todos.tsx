import React, { useEffect, useState, createContext, useContext } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Stack,
  Text,
  DialogActionTrigger,
  Checkbox,
} from "@chakra-ui/react";


interface Todo {
  id: string;
  item: string;
  completed: boolean;
}

interface UpdateTodoProps {
  item: string;
  id: string;
  completed: boolean;
  fetchTodos: () => void;
}

interface TodoHelperProps {
  item: string;
  id: string;
  completed: boolean;
  fetchTodos: () => void;
}

interface DeleteTodoProps {
  id: string;
  fetchTodos: () => void;
}

const TodosContext = createContext({
  todos: [], fetchTodos: () => {}
})

function AddTodo() {
  const [item, setItem] = React.useState("")
  const {todos, fetchTodos} = React.useContext(TodosContext)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newTodo = {
      "id": (todos.length + 1).toString(),
      "item": item,
      "completed": false
    }

    fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
    }).then(fetchTodos)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Add a todo item"
        aria-label="Add a todo item"
        onChange={handleInput}
        mb="4"
      />
    </form>
  )
}

const UpdateTodo = ({ item, id, fetchTodos }: UpdateTodoProps) => {
  const [todo, setTodo] = useState(item);
  const updateTodo = async () => {
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: todo }),
    });
    await fetchTodos();
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button h="1.5rem" size="sm">
          Update Todo
        </Button>
      </DialogTrigger>
      <DialogContent
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="white"
        p={6}
        rounded="md"
        shadow="xl"
        maxW="md"
        w="90%"
        zIndex={1000}
      >
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Add a todo item"
            aria-label="Add a todo item"
            value={todo}
            onChange={event => setTodo(event.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </DialogActionTrigger>
          <Button size="sm" onClick={updateTodo}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

const DeleteTodo = ({ id, fetchTodos }: DeleteTodoProps) => {
  const deleteTodo = async () => {
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id })
    })
    await fetchTodos()
  }

  return (
    <Button h="1.5rem" size="sm" marginLeft={2} onClick={deleteTodo}>Delete Todo</Button>
  )
}

function TodoHelper({item, id, completed, fetchTodos}: TodoHelperProps) {
  const toggleComplete = async () => {
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    await fetchTodos();
  };

  return (
    <Box p={3} shadow="sm" border="1px solid" borderColor="gray.100" rounded="md">
      <Flex justify="space-between" align="center">
        <Flex align="center" gap="3">
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={toggleComplete} 
            style={{ width: '20px', height: '20px' }}
          />
          <Text textDecoration={completed ? "line-through" : "none"} color={completed ? "gray.500" : "black"}>
            {item}
          </Text>
        </Flex>
        <Flex>
          <UpdateTodo item={item} id={id} completed={completed} fetchTodos={fetchTodos}/>
          <DeleteTodo id={id} fetchTodos={fetchTodos}/>
        </Flex>
      </Flex>
    </Box>
  )
}

export default function Todos() {
  const [todos, setTodos] = useState([])
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo")
    const todos = await response.json()
    setTodos(todos.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <TodosContext.Provider value={{todos, fetchTodos}}>
      <Container maxW="container.xl" pt="100px">
        <AddTodo />
        <Stack gap={3}>
            {
            todos.map((todo) => (
                <TodoHelper key={todo.id} item={todo.item} id={todo.id} completed={todo.completed} fetchTodos={fetchTodos}/>
            ))
            }
        </Stack>
      </Container>
    </TodosContext.Provider>
  )
}
