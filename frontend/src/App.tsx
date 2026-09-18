import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import Header from "./components/Header";
import Todos from "./components/Todos";
import Message from "./components/Message";

function App() {

  return (
    <ChakraProvider value={defaultSystem}>
      <Header />
      <Message />
      <Todos />
    </ChakraProvider>
  )
}

export default App;
