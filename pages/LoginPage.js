import { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Text, Spinner, useToast, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from '../components/AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();

  const handleLogin = () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (username === 'user' && password === 'password') {
        login(username, password);
        toast({
          title: "Login successful.",
          description: "You have successfully logged in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1500); // Simulate a network request
  };

  const boxBg = useColorModeValue('white', 'gray.700');
  const inputBg = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box
        w="sm"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={boxBg}
      >
        <FormControl id="username" mb={4}>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            focusBorderColor="blue.500"
            bg={inputBg}
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            focusBorderColor="blue.500"
            bg={inputBg}
          />
        </FormControl>
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <Button
          onClick={handleLogin}
          colorScheme="blue"
          width="full"
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : 'Login'}
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
