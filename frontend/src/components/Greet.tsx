import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";

export default function Greet() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name) return;

    try {
      const response = await fetch("http://localhost:8000/greet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      setGreeting(data.message);
    } catch (error) {
      console.error("Error fetching greeting:", error);
      setGreeting("Error connecting to server");
    }
  };

  return (
    <Container maxW="container.md" pt="50px">
      <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
        <Heading size="md" mb={4}>Greeting Service</Heading>
        <form onSubmit={handleSubmit}>
          <Stack direction="row" gap={4}>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleInput}
            />
            <Button type="submit" colorScheme="blue">Submit</Button>
          </Stack>
        </form>
        {greeting && (
          <Text mt={6} fontSize="xl" fontWeight="bold" color="teal.600">
            {greeting}
          </Text>
        )}
      </Box>
    </Container>
  );
}
