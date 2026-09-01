import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Input, 
  VStack, 
  Heading, 
  Text,
  useToast
} from "@chakra-ui/react";

const Signup = ({ onSignupSuccess }: { onSignupSuccess: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onSignupSuccess();
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong during signup.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" m="auto" mt="100px">
      <VStack spacing={4} align="stretch">
        <Heading textAlign="center">Sign Up</Heading>
        <form onSubmit={handleSignup}>
          <VStack spacing={4}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button colorScheme="teal" width="full" type="submit" isLoading={loading}>
              Register
            </Button>
          </VStack>
        </form>
        <Text textAlign="center">
          Already have an account? <Button variant="link" onClick={onSignupSuccess}>Login</Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default Signup;
