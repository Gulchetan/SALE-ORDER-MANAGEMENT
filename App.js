import { Routes, Route, Navigate } from 'react-router-dom';
import {  Box, useColorMode, Button } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './components/AuthContext';
import LoginPage from './pages/LoginPage';
import SaleOrdersPage from './pages/SaleOrdersPage';


function App() {
  return (
    <AuthProvider>
      <Box>
        <ColorModeSwitcher />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sale-orders" element={<ProtectedRoute component={SaleOrdersPage} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Box>
    </AuthProvider>
  );
}

function ProtectedRoute({ component: Component }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} mt={4} ml={4}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
}

export default App;
