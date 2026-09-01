import React from "react";
import { Box, VStack, Button, Text } from "@chakra-ui/react";

interface SidebarProps {
  setView: (view: string) => void;
  currentView: string;
}

const Sidebar = ({ setView, currentView }: SidebarProps) => {
  return (
    <Box
      w="200px"
      pos="fixed"
      left="0"
      h="calc(100vh - 64px)"
      bg="gray.100"
      borderRight="1px solid"
      borderColor="gray.200"
      p={4}
    >
      <VStack align="stretch" gap={4}>
        <Text fontWeight="bold" mb={2}>Menu</Text>
        <Button
          variant={currentView === "todos" ? "solid" : "ghost"}
          onClick={() => setView("todos")}
          justifyContent="flex-start"
        >
          Tasks
        </Button>
        <Button
          variant={currentView === "dashboard" ? "solid" : "ghost"}
          onClick={() => setView("dashboard")}
          justifyContent="flex-start"
        >
          Dashboard
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
