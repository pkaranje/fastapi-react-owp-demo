import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Card,
} from "@chakra-ui/react";

interface Todo {
  id: string;
  item: string;
  status: string;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo");
    const data = await response.json();
    setTodos(data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const activeTasks = todos.filter((t) => t.status === "active");
  const completedTasks = todos.filter((t) => t.status === "completed");

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        <Card.Root p={4} border="1px solid" borderColor="blue.200">
          <Card.Header>
            <Heading size="md" color="blue.600">Active Tasks</Heading>
          </Card.Header>
          <Card.Body>
            <Text fontSize="4xl" fontWeight="bold">{activeTasks.length}</Text>
          </Card.Body>
        </Card.Root>

        <Card.Root p={4} border="1px solid" borderColor="green.200">
          <Card.Header>
            <Heading size="md" color="green.600">Completed Tasks</Heading>
          </Card.Header>
          <Card.Body>
            <Text fontSize="4xl" fontWeight="bold">{completedTasks.length}</Text>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      <Box mt={10}>
        <Heading size="md" mb={4}>Summary</Heading>
        <Stack gap={3}>
          {todos.map((todo) => (
            <Box key={todo.id} p={3} shadow="sm" border="1px solid" borderColor="gray.100" rounded="md">
              <Flex justify="space-between" align="center">
                <Text>{todo.item}</Text>
                <Text
                  fontSize="xs"
                  px={2}
                  py={1}
                  rounded="full"
                  bg={todo.status === "completed" ? "green.100" : "blue.100"}
                  color={todo.status === "completed" ? "green.700" : "blue.700"}
                >
                  {todo.status}
                </Text>
              </Flex>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}

// Minimal Flex import for the summary list
import { Flex } from "@chakra-ui/react";
