import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import Header from "./components/Header";
import Todos from "./components/Todos";
import Signup from "./components/Signup";
import { useState } from 'react';
import { Button, Box } from '@chakra-ui/react';

function App() {
  const [view, setView] = useState<'todos' | 'signup'>('todos');

  return (
    <ChakraProvider value={defaultSystem}>
      <Header />
      <Box textAlign="center" py={4}>
        <Button onClick={() => setView('todos')} colorScheme={view === 'todos' ? 'teal' : 'gray'} mr={2}>
          Todos
        </Button>
        <Button onClick={() => setView('signup')} colorScheme={view === 'signup' ? 'teal' : 'gray'}>
          Signup
        </Button>
      </Box>
      {view === 'todos' ? <Todos /> : <Signup />}
    </ChakraProvider>
  )
}

export default App;
