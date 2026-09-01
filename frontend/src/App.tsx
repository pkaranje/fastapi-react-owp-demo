import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Header from "./components/Header";
import Todos from "./components/Todos";

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ChakraProvider value={defaultSystem}>
      <div className={`app-container ${theme}-theme`}>
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <Todos />
      </div>
    </ChakraProvider>
  )
}

export default App;
