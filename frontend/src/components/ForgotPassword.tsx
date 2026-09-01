import React, { useState } from "react";
import {
  Box,
  Button,
  Field,
  Input,
  VStack,
  Text,
  useToast,
  Container,
  Heading,
} from "@chakra-ui/react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEmail("");
      } else {
        toast({
          title: "Error",
          description: data.detail || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to the server",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="md" py={12} mt={20}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl">Forgot Password</Heading>
          <Text mt={4} color="gray.600">
            Enter your email address and we'll send you a link to reset your
            password.
          </Text>
        </Box>

        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Field.Root>
                <Field.Label>Email Address</Field.Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field.Root>
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={isLoading}
              >
                Send Reset Link
              </Button>
            </VStack>
          </form>
        </Box>

        <Box textAlign="center">
          <Button variant="link" colorScheme="blue" onClick={() => window.location.href = "/"}>
            Back to Home
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default ForgotPassword;
