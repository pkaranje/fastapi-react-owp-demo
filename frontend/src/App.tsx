import { ChakraProvider, Box, Flex } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import Header from "./components/Header";
import Todos from "./components/Todos";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  return (
    <ChakraProvider value={defaultSystem}>
      <Flex direction="column" h="100vh">
        <Header />
        <Flex flex="1" overflow="hidden">
          <Sidebar setFilter={setFilter} />
          <Box flex="1" overflowY="auto">
            <Todos filter={filter} />
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default App;
