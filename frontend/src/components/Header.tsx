import React from "react";
import { Heading, Flex, Separator, Button } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="var(--header-bg)"
      color="var(--text-color)"
      width="100%"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex align="center" as="nav" mr={5}>
        <Heading as="h1" size="sm">Todos</Heading>
      </Flex>
      <Button 
        onClick={onToggleTheme} 
        variant="ghost" 
        size="sm"
        aria-label="Toggle Theme"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </Button>
    </Flex>
  );
};

export default Header;
