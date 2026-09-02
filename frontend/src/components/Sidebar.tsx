import { Box, Stack, Button, Text } from "@chakra-ui/react";

interface SidebarProps {
  setFilter: (filter: "all" | "active" | "completed") => void;
}

export default function Sidebar({ setFilter }: SidebarProps) {
  return (
    <Box 
      w="250px" 
      bg="gray.50" 
      p={5} 
      borderRight="1px solid" 
      borderColor="gray.200"
      height="100%"
    >
      <Text fontWeight="bold" mb={5} fontSize="lg">Dashboard</Text>
      <Stack gap={2}>
        <Button 
          variant="ghost" 
          justifyContent="flex-start" 
          onClick={() => setFilter("all")}
        >
          All Tasks
        </Button>
        <Button 
          variant="ghost" 
          justifyContent="flex-start" 
          onClick={() => setFilter("active")}
        >
          Active Tasks
        </Button>
        <Button 
          variant="ghost" 
          justifyContent="flex-start" 
          onClick={() => setFilter("completed")}
        >
          Completed Tasks
        </Button>
      </Stack>
    </Box>
  );
}
