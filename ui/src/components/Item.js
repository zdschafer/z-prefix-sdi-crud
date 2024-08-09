import { useEffect } from "react";
import { Card, Text, Button, Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function Item({ item, userPage }) {
  const navigate = useNavigate();


  //if userPage is true, the edit button appears for each item in order to make changes
  //if userPage is false, you can only view the item
  return userPage ? (
    <Flex flexDirection="column" justifyContent="space-between" maxWidth="100%" maxHeight="100%" boxShadow="lg" padding="2em">
      <Text>Name: {item.name}</Text>
      <Text>Description: {item.description.length > 100 ? item.description.substring(0, 99) + "..." : item.description}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Flex justifyContent="center"><Button onClick={() => navigate(`/items/edit/${item.id}`)}>Edit/View Item</Button></Flex>
    </Flex>
  ) : (
    <Flex flexDirection="column" justifyContent="space-between" maxWidth="100%" maxHeight="100%" boxShadow="lg" padding="2em">
      <Text>Name: {item.name}</Text>
      <Text>
        Description:{" "}
        {item.description.length > 100 ? item.description.substring(0, 99) + "..." : item.description}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Flex justifyContent="center"><Button onClick={() => navigate(`/items/details/${item.id}`)}>See Details</Button></Flex>
    </Flex>
  );
}
