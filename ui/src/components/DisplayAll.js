import { useEffect, useState } from "react";
import { Input, Button, ButtonGroup, Box, Stack, Center, Heading, useToast, SimpleGrid } from '@chakra-ui/react';
import Item from "./Item";
import { useNavigate } from "react-router-dom";

export default function DisplayAll({ username, userPage, setUsername }) {
    //console.log(username, userPage);
    const navigate = useNavigate();
    const [ data, setData ] = useState([]);
    const [ inventoryString, setInventoryString ] = useState("");
    
    useEffect(() => {
        if(userPage) {
            fetch(`http://localhost:8080/itemsByUser/${username}`)
            .then(res => res.json())
            .then(data => setData(data))

            setInventoryString(`${username}'s Inventory`);
        }
        else {
            fetch(`http://localhost:8080/items`)
            .then(res => res.json())
            .then(data => setData(data))

            setInventoryString("All Inventory");
        }
    }, [data])

    //if username isn't undefined (you are logged in), you are able to create items, see your inventory, see the total inventory, and logout of our account.
    //The userPage prop is a boolean telling the item whether or not the user page is being rendered. If it is, you have the option to edit the item, otherwise you can just view.
    
    //if username is undefined (continued as guest),  you can only view items, their details, and have the option to sign in
    return username ? (
        <Box width="90%" margin="0 auto">
            <ButtonGroup>
                <Button onClick={() => navigate(`/items/create`)}>Create Item</Button>
                <Button onClick={() => navigate(`/items/${username}`)}>My Inventory</Button>
                <Button onClick={() => navigate(`/items/`)}>All Inventory</Button>
                <Button onClick={() => {
                    setUsername();
                    navigate("/");
                }}>Sign Out</Button>
            </ButtonGroup>
            <Heading>{inventoryString}</Heading>
            <SimpleGrid spacing='40px' textAlign="center" columns={3}>
                {data.map(item => <Item key={item.id} item={item} userPage={userPage} />)}
            </SimpleGrid>
        </Box>
    ) : (
        <Box width="90%" margin="0 auto">
            <Button onClick={() => navigate("/")}>Login Page</Button>
            <Heading>{inventoryString}</Heading>
            <SimpleGrid spacing='40px' textAlign="center" columns={3}>
                {data.map(item => <Item key={item.id} item={item} userPage={false} />)}
            </SimpleGrid>
        </Box>
    )
}