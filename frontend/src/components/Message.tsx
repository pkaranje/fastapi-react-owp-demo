import React, { useState } from "react";
import { Button, Text, Container, Box } from "@chakra-ui/react";

const Message = () => {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    try {
        const response = await fetch("http://localhost:8000/message");
        const data = await response.json();
        setMessage(data.message);
    } catch (error) {
        console.error("Error fetching message:", error);
    }
  };

  return (
    <Container maxW="container.xl" pt="20px">
      <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
        <Button onClick={fetchMessage} mb={4}>Get Message</Button>
        {message && <Text fontSize="xl" fontWeight="bold" mt={4}>{message}</Text>}
      </Box>
    </Container>
  );
};

export default Message;
