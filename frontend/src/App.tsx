import { ChakraProvider, Box, Flex, Button, Stack, Text, Container } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import { useState } from "react";
import Header from "./components/Header";
import Todos from "./components/Todos";

function Dashboard({ todos }: { todos: any[] }) {
  const activeTasks = todos.filter(t => !t.completed);
  const completedTasks = todos.filter(t => t.completed);

  return (
    <Container maxW="container.xl" pt="20px">
      <Stack gap={10}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Active Tasks ({activeTasks.length})</Text>
          <Stack gap={3}>
            {activeTasks.map(t => (
              <Box key={t.id} p={3} shadow="md" borderWidth="1px" borderRadius="md">
                <Text>{t.item}</Text>
              </Box>
            ))}
            {activeTasks.length === 0 && <Text color="gray.500">No active tasks.</Text>}
          </Stack>
        </Box>
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Completed Tasks ({completedTasks.length})</Text>
          <Stack gap={3}>
            {completedTasks.map(t => (
              <Box key={t.id} p={3} shadow="md" borderWidth="1px" borderRadius="md" bg="green.50">
                <Text textDecoration="line-through">{t.item}</Text>
              </Box>
            ))}
            {completedTasks.length === 0 && <Text color="gray.500">No completed tasks.</Text>}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

function App() {
  const [view, setView] = useState<"todos" | "dashboard">("todos");
  const [todos, setTodos] = useState<any[]>([]);

  return (
    <ChakraProvider value={defaultSystem}>
      <Flex h="100vh">
        {/* Sidebar */}
        <Box w="250px" bg="gray.100" p={5} borderRight="1px solid" borderColor="gray.200">
          <Text fontSize="xl" fontWeight="bold" mb={10}>Todo App</Text>
          <Stack gap={4}>
            <Button 
              variant={view === "todos" ? "solid" : "ghost"} 
              justifyContent="flex-start" 
              onClick={() => setView("todos")}
            >
              My Todos
            </Button>
            <Button 
              variant={view === "dashboard" ? "solid" : "ghost"} 
              justifyContent="flex-start" 
              onClick={() => setView("dashboard")}
            >
              Dashboard
            </Button>
          </Stack>
        </Box>

        {/* Main Content */}
        <Box flex="1" overflowY="auto">
          <Header />
          {view === "todos" ? <Todos onTodosUpdate={setTodos} /> : <Dashboard todos={todos} />}
        </Box>
      </Flex>
    </ChakraProvider>
  )
}

export default App;
