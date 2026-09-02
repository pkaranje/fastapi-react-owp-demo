import React from "react";
import { Box, VStack, Button, Text } from "@chakra-ui/react";

interface SidebarProps {
  setView: (view: string) => void;
}

const Sidebar = ({ setView }: SidebarProps) => {
  return (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      top="64px"
      h="calc(100vh - 64px)"
      w="200px"
      bg="gray.100"
      p="4"
      borderRight="1px solid"
      borderColor="gray.200"
      zIndex="900"
    >
      <VStack align="stretch" gap="4">
        <Text fontWeight="bold" mb="2">Navigation</Text>
        <Button variant="ghost" justifyContent="flex-start" onClick={() => setView("todos")}>
          Todos
        </Button>
        <Button variant="ghost" justifyContent="flex-start" onClick={() => setView("dashboard")}>
          Dashboard
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
