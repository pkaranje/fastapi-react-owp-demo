import React, { useState } from "react";
import { Button, Text, Box, VStack } from "@chakra-ui/react";

const MessageFetcher = () => {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    try {
      const response = await fetch("http://localhost:8000/message");
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
      setMessage("Error fetching message");
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <VStack gap={4}>
        <Button colorScheme="teal" onClick={fetchMessage}>
          Get Message
        </Button>
        {message && (
          <Text fontSize="lg" fontWeight="bold">
            {message}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default MessageFetcher;
