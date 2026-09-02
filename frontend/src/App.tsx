import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import Header from "./components/Header";
import Todos from "./components/Todos";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

function App() {
  const [view, setView] = useState("todos");

  return (
    <ChakraProvider value={defaultSystem}>
      <Header />
      <Sidebar setView={setView} />
      <main style={{ marginLeft: "200px" }}>
        {view === "todos" ? <Todos /> : <Dashboard />}
      </main>
    </ChakraProvider>
  )
}

export default App;
