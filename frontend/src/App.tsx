import { ChakraProvider, Box, Flex } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import { useState } from "react";
import Header from "./components/Header";
import Todos from "./components/Todos";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  const [view, setView] = useState("todos");

  return (
    <ChakraProvider value={defaultSystem}>
      <Header />
      <Flex pt="64px">
        <Sidebar setView={setView} currentView={view} />
        <Box flex="1" ml="200px" p={4}>
          {view === "todos" ? <Todos /> : <Dashboard />}
        </Box>
      </Flex>
    </ChakraProvider>
  )
}

export default App;
