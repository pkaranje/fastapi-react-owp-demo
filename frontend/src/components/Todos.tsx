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
  todos: [] as Todo[], fetchTodos: () => {}
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
    <Box p={3} shadow="sm" borderWidth="1px" borderRadius="md">
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Checkbox 
            checked={completed} 
            onChange={toggleComplete} 
            mr={3}
          />
          <Text textDecoration={completed ? "line-through" : "none"}>
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

interface TodosProps {
  filter: "all" | "active" | "completed";
}

export default function Todos({ filter }: TodosProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo")
    const data = await response.json()
    setTodos(data.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <TodosContext.Provider value={{todos, fetchTodos}}>
      <Container maxW="container.md" pt="20px">
        <Box mb={8}>
            <AddTodo />
        </Box>
        <Stack gap={3}>
            {
            filteredTodos.map((todo) => (
                <TodoHelper key={todo.id} item={todo.item} id={todo.id} completed={todo.completed} fetchTodos={fetchTodos}/>
            ))
            }
        </Stack>
      </Container>
    </TodosContext.Provider>
  )
}
