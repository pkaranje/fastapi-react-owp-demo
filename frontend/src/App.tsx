import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Todos from "./components/Todos";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const renderContent = () => {
    if (currentPath === '/forgot-password') {
      return <ForgotPassword />;
    }
    return <Todos />;
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Header />
      {renderContent()}
    </ChakraProvider>
  )
}

export default App;
