import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

function SaleOrderList({ orders, onEdit, onDelete, onComplete, readOnly }) {
  return (
    <Box>
      {orders.map(order => (
        <Box key={order.id} p={4} borderWidth="1px" borderRadius="md" mb={4}>
          <Text>Invoice No: {order.invoice_no}</Text>
          <Text>Invoice Date: {order.invoice_date}</Text>
          <Text>Customer ID: {order.customer_id}</Text>
          <Text>Items: {order.items.length}</Text>
          <Flex mt={2}>
            {!readOnly && (
              <>
                <Button colorScheme="blue" mr={2} onClick={() => onEdit(order)}>Edit</Button>
                <Button colorScheme="red" mr={2} onClick={() => onDelete(order.id)}>Delete</Button>
                <Button colorScheme="green" onClick={() => onComplete(order)}>Complete</Button>
              </>
            )}
          </Flex>
        </Box>
      ))}
    </Box>
  );
}

export default SaleOrderList;
