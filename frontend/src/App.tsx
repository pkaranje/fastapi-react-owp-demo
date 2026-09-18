import { ChakraProvider, VStack } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import Header from "./components/Header";
import Todos from "./components/Todos";
import MessageFetcher from "./components/MessageFetcher";

function App() {

  return (
    <ChakraProvider value={defaultSystem}>
      <Header />
      <VStack gap={8} p={10} mt={20}>
        <MessageFetcher />
        <Todos />
      </VStack>
    </ChakraProvider>
  )
}

export default App;
