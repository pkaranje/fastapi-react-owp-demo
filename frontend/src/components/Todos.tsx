import React, { useEffect, useState, createContext } from "react";
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
  IconButton,
} from "@chakra-ui/react";


interface Todo {
  id: string;
  item: string;
  status: string;
}

interface UpdateTodoProps {
  item: string;
  id: string;
  status: string;
  fetchTodos: () => void;
}

interface TodoHelperProps {
  item: string;
  id: string;
  status: string;
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
      "id": todos.length + 1,
      "item": item,
      "status": "active"
    }

    fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
    }).then(() => {
      setItem("");
      fetchTodos();
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Add a todo item"
        aria-label="Add a todo item"
        value={item}
        onChange={handleInput}
        mb={4}
      />
    </form>
  )
}

const UpdateTodo = ({ item, id, status, fetchTodos }: UpdateTodoProps) => {
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
        <Button h="1.5rem" size="sm" variant="outline">
          Edit
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
    <Button h="1.5rem" size="sm" marginLeft={2} colorPalette="red" onClick={deleteTodo}>Delete</Button>
  )
}

function TodoHelper({item, id, status, fetchTodos}: TodoHelperProps) {
  const toggleStatus = async () => {
    const newStatus = status === "active" ? "completed" : "active";
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    await fetchTodos();
  }

  return (
    <Box p={3} shadow="sm" border="1px solid" borderColor="gray.100" rounded="md">
      <Flex justify="space-between" align="center">
        <Box>
           <Text fontWeight="medium" textDecoration={status === "completed" ? "line-through" : "none"}>
            {item}
          </Text>
          <Text fontSize="xs" color="gray.500">{status}</Text>
        </Box>
        <Flex align="center" gap={2}>
          <Button h="1.5rem" size="sm" onClick={toggleStatus} colorPalette={status === "active" ? "green" : "orange"}>
            {status === "active" ? "Complete" : "Undo"}
          </Button>
          <UpdateTodo item={item} id={id} status={status} fetchTodos={fetchTodos}/>
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
    const data = await response.json()
    setTodos(data.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <TodosContext.Provider value={{todos, fetchTodos}}>
      <Container maxW="container.md">
        <AddTodo />
        <Stack gap={3}>
            {
            todos.map((todo: Todo) => (
                <TodoHelper key={todo.id} item={todo.item} id={todo.id} status={todo.status} fetchTodos={fetchTodos}/>
            ))
            }
        </Stack>
      </Container>
    </TodosContext.Provider>
  )
}
