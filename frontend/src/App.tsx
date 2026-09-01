import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import { useState } from "react";
import Header from "./components/Header";
import Todos from "./components/Todos";
import Signup from "./components/Signup";

function App() {
  const [view, setView] = useState<"todos" | "signup">("todos");

  return (
    <ChakraProvider value={defaultSystem}>
      <Header />
      {view === "todos" ? (
        <>
          <Todos />
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={() => setView("signup")} style={{ cursor: "pointer", textDecoration: "underline" }}>
              Don't have an account? Sign up here.
            </button>
          </div>
        </>
      ) : (
        <Signup onSignupSuccess={() => setView("todos")} />
      )}
    </ChakraProvider>
  )
}

export default App;
