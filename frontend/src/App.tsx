import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import Header from "./components/Header";
import Todos from "./components/Todos";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <ChakraProvider value={defaultSystem}>
      {!user ? (
        <Login onLogin={(u) => setUser(u)} />
      ) : (
        <>
          <Header />
          <Todos />
        </>
      )}
    </ChakraProvider>
  )
}

export default App;
