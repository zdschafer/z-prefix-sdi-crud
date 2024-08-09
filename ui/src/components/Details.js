import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, Button, ButtonGroup, Box, Stack, Center, Heading, useToast, Textarea, Text } from '@chakra-ui/react';

export default function Details() {
    
    let { itemId } = useParams();
    const navigate = useNavigate();
    const [ currentData, setCurrentData ] = useState({});
    const [ owner, setOwner ] = useState("");
    
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
            <Heading>{currentData.name}</Heading>
            <Text width='50%'>Item ID: {currentData.id}</Text>
            <Text width='50%'>Owned By: {owner}</Text>
            <Text width='50%'>Quantity: {currentData.quantity}</Text>
            <Text width='50%'>Description: {currentData.description}</Text>
            <Button onClick={() =>  navigate(`/items/`)}>Back</Button>
        </>
    )
}