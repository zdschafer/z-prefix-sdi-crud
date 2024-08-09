import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, Button, ButtonGroup, Box, Stack, Center, Heading, useToast, Textarea, Text } from '@chakra-ui/react';



export default function EditItem({ username }) {
    let { itemId } = useParams();
    const navigate = useNavigate();
    const [ currentData, setCurrentData ] = useState({});
    const [ owner, setOwner ] = useState("");
    const toast = useToast();
    
    useEffect(() => {
        fetch(`http://localhost:8080/items/${itemId}`)
        .then(res => res.json())
        .then(data => {
            setCurrentData(data[0])
            return data[0].user_id
        })
        .then(id => fetch(`http://localhost:8080/usersById/${id}`)
            .then(res => res.json())
            .then(data => setOwner(data)))
    }, [])
    
    return (
        <>
            <Heading>Edit Item</Heading>
            <Stack spacing="10px" marginY="1em">
                <Text>Item ID: {currentData.id}</Text>
                <Text>Owned By: {owner}</Text>
                <Text>Name: </Text><Input  variant='filled' type="text" name="name" id="name" defaultValue={currentData.name} required />
                <Text>Quantity: </Text><Input width='50%' variant='filled' type="number" name="quantity" id="quantity" defaultValue={currentData.quantity} required />
                <Text>Description: </Text><Textarea width='50%' variant='filled' type="text" name="description" id="description" defaultValue={currentData.description} required />
            </Stack>
            <ButtonGroup>
                <Button onClick={() => changeItem(currentData.id, username, navigate)}>Submit Changes</Button>
                <Button onClick={() => deleteItem(currentData.id, username, navigate)}>Delete Item</Button>
                <Button onClick={() =>  navigate(`/items/${username}`)}>Cancel</Button>
            </ButtonGroup>
            
        </>
    )
}

function deleteItem(id, username, navigate) {
    fetch(`http://localhost:8080/items/${id}`, {
        method: "DELETE"
    })
    navigate(`/items/${username}`)
}

function changeItem(id, username, navigate) {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let quantity = document.getElementById("quantity").value;

    if(name && description && quantity) {
        console.log(typeof quantity)
        fetch(`http://localhost:8080/items/${id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                description: description,
                quantity: quantity
            })
        })
        .then(response => {
            if(response.ok) {
                navigate(`/items/${username}`)
            }
        })
    }
}