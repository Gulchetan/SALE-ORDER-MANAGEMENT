import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Box, VStack, HStack } from '@chakra-ui/react';

function SaleOrderForm({ onSubmit, defaultValues }) {
  const [order, setOrder] = useState({
    ...defaultValues,
    items: defaultValues.items || []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...order.items];
    items[index][name] = value;
    setOrder({
      ...order,
      items
    });
  };

  const handleAddItem = () => {
    setOrder({
      ...order,
      items: [...order.items, { sku_id: '', price: '', quantity: '' }]
    });
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(order);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Customer ID</FormLabel>
        <Input name="customer_id" value={order.customer_id} onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Invoice No</FormLabel>
        <Input name="invoice_no" value={order.invoice_no} onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Invoice Date</FormLabel>
        <Input name="invoice_date" type="date" value={order.invoice_date} onChange={handleChange} />
      </FormControl>
      <VStack align="stretch" mb={4}>
        {order.items.map((item, index) => (
          <HStack key={index} spacing={4}>
            <FormControl>
              <FormLabel>SKU ID</FormLabel>
              <Input name="sku_id" value={item.sku_id} onChange={(e) => handleItemChange(index, e)} />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input name="price" value={item.price} onChange={(e) => handleItemChange(index, e)} />
            </FormControl>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
            </FormControl>
           
          </HStack>
        ))}
        <Button onClick={handleAddItem}>Add Item</Button>
      </VStack>
      <Button type="submit">Save</Button>
    </Box>
  );
}

export default SaleOrderForm;
