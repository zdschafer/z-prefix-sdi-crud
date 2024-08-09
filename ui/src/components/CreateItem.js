import { useNavigate } from "react-router-dom";
import { Input, Button, ButtonGroup, Box, Stack, Center, Heading, useToast, Textarea } from '@chakra-ui/react';

export default function CreateItem({ username }) {
    
    const navigate = useNavigate();

    return (
        <>
            <Heading>Create An Item</Heading>
            <Stack spacing="10px" marginY="1em">
                <Input width='50%' variant='filled' type="text" name="name" id="name" placeholder="Name" required />
                <Input width='50%' variant='filled' type="number" name="quantity" id="quantity" placeholder="Quantity" required />
                <Textarea width='50%' variant='filled' type="text" name="description" id="description" placeholder="Description" required />
            </Stack>

            <ButtonGroup>
                <Button onClick={() => submitCreate(username, navigate)}>Submit</Button>
                <Button onClick={() => navigate(`/items/${username}`)}>Cancel</Button>
            </ButtonGroup>
        </>
    )
}

function submitCreate(username, navigate) {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let quantity = document.getElementById("quantity").value;

    if(name && description && quantity) {
        fetch("http://localhost:8080/items", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                description: description,
                quantity: quantity,
                username: username
            })
        })
        .then(response => {
            if(response.ok) {
                navigate(`/items/${username}`)
            }
        })
    }
}