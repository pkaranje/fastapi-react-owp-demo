import React, { useEffect, useState } from "react";
import { Container, Heading, Stack, Box, Text, Badge, Flex } from "@chakra-ui/react";

interface Todo {
  id: string;
  item: string;
  completed: boolean;
}

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo");
    const data = await response.json();
    setTodos(data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const activeTasks = todos.filter(t => !t.completed);
  const completedTasks = todos.filter(t => t.completed);

  return (
    <Container maxW="container.xl" pt="100px">
      <Heading mb="6">Task Dashboard</Heading>
      
      <Flex gap="10" wrap="wrap">
        <Box flex="1" minW="300px">
          <Heading size="md" mb="4" color="blue.600">
            Active Tasks ({activeTasks.length})
          </Heading>
          <Stack gap="3">
            {activeTasks.length > 0 ? activeTasks.map(todo => (
              <Box key={todo.id} p="3" shadow="sm" border="1px solid" borderColor="gray.100" rounded="md">
                <Text>{todo.item}</Text>
              </Box>
            )) : <Text color="gray.500">No active tasks</Text>}
          </Stack>
        </Box>

        <Box flex="1" minW="300px">
          <Heading size="md" mb="4" color="green.600">
            Completed Tasks ({completedTasks.length})
          </Heading>
          <Stack gap="3">
            {completedTasks.length > 0 ? completedTasks.map(todo => (
              <Box key={todo.id} p="3" shadow="sm" border="1px solid" borderColor="gray.100" rounded="md" bg="green.50">
                <Text textDecoration="line-through">{todo.item}</Text>
              </Box>
            )) : <Text color="gray.500">No completed tasks</Text>}
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Dashboard;
