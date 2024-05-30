import { useState, useEffect } from 'react';
import {
  Box, Tabs, TabList, TabPanels, Tab, TabPanel, Button,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Spinner, useToast
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import SaleOrderForm from '../components/SaleOrderForm';
import SaleOrderList from '../components/SaleOrderList';
import { useAuth } from '../components/AuthContext';
import { motion } from 'framer-motion';

function SaleOrdersPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeSaleOrders, setActiveSaleOrders] = useState([]);
  const [completedSaleOrders, setCompletedSaleOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const toast = useToast();

  const fetchActiveSaleOrders = async () => {
    const { data } = await axios.get('http://localhost:3001/activeSaleOrders');
    return data;
  };

  const fetchCompletedSaleOrders = async () => {
    const { data } = await axios.get('http://localhost:3001/completedSaleOrders');
    return data;
  };

  const { data: activeOrders, isLoading: loadingActiveOrders } = useQuery({
    queryKey: ['activeSaleOrders'],
    queryFn: fetchActiveSaleOrders
  });

  const { data: completedOrders, isLoading: loadingCompletedOrders } = useQuery({
    queryKey: ['completedSaleOrders'],
    queryFn: fetchCompletedSaleOrders
  });

  useEffect(() => {
    if (activeOrders) setActiveSaleOrders(activeOrders);
  }, [activeOrders]);

  useEffect(() => {
    if (completedOrders) setCompletedSaleOrders(completedOrders);
  }, [completedOrders]);

  const addSaleOrderMutation = useMutation({
    mutationFn: newOrder => axios.post('http://localhost:3001/activeSaleOrders', newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries('activeSaleOrders');
      toast({
        title: 'Sale Order created.',
        description: "The new sale order has been created successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const editSaleOrderMutation = useMutation({
    mutationFn: updatedOrder => axios.put(`http://localhost:3001/activeSaleOrders/${updatedOrder.id}`, updatedOrder),
    onSuccess: () => {
      queryClient.invalidateQueries('activeSaleOrders');
      toast({
        title: 'Sale Order updated.',
        description: "The sale order has been updated successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const deleteSaleOrderMutation = useMutation({
    mutationFn: id => axios.delete(`http://localhost:3001/activeSaleOrders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries('activeSaleOrders');
      toast({
        title: 'Sale Order deleted.',
        description: "The sale order has been deleted successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const completeSaleOrderMutation = useMutation({
    mutationFn: order => axios.post('http://localhost:3001/completedSaleOrders', order).then(() =>
      axios.delete(`http://localhost:3001/activeSaleOrders/${order.id}`)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries('activeSaleOrders');
      queryClient.invalidateQueries('completedSaleOrders');
      toast({
        title: 'Sale Order completed.',
        description: "The sale order has been moved to completed orders.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const handleAddSaleOrder = (newOrder) => {
    if (currentOrder) {
      editSaleOrderMutation.mutate({ ...currentOrder, ...newOrder });
    } else {
      addSaleOrderMutation.mutate(newOrder);
    }
    onClose();
  };

  const handleEditSaleOrder = (order) => {
    setCurrentOrder(order);
    onOpen();
  };

  const handleDeleteSaleOrder = (id) => {
    deleteSaleOrderMutation.mutate(id);
  };

  const handleCompleteSaleOrder = (order) => {
    completeSaleOrderMutation.mutate(order);
  };

  return (
    <Box>
      <Flex justify="flex-end" mb={4}>
        <Button onClick={logout} mb={4}>Logout</Button>
      </Flex>
      <Tabs>
        <TabList as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Button onClick={() => { setCurrentOrder(null); onOpen(); }}>+ Sale Order</Button>
            {loadingActiveOrders ? <Spinner /> : (
              <SaleOrderList
                orders={activeSaleOrders}
                onEdit={handleEditSaleOrder}
                onDelete={handleDeleteSaleOrder}
                onComplete={handleCompleteSaleOrder}
                readOnly={false}
              />
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent as={motion.div} initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
                <ModalHeader>{currentOrder ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <SaleOrderForm onSubmit={handleAddSaleOrder} defaultValues={currentOrder || {}} />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </TabPanel>
          <TabPanel as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {loadingCompletedOrders ? <Spinner /> : (
              <SaleOrderList orders={completedSaleOrders} readOnly />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default SaleOrdersPage;
