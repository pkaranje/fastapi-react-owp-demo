import React from "react";
import { Heading, Flex, Separator, Button, Link } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="gray.400"
      width="100%"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="sm" cursor="pointer" onClick={() => {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}>
          Todos
        </Heading>
      </Flex>
      <Box>
        <Button variant="ghost" size="sm" onClick={() => {
          window.history.pushState({}, '', '/forgot-password');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}>
          Forgot Password?
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
