import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input, Button, ButtonGroup, Box, Stack, Center, Heading, useToast } from '@chakra-ui/react';


export default function LoginPage({ setUsername }) {
    
    const [ login, setLogin ] = useState({username: "", password: ""});
    const navigate = useNavigate();
    const toast = useToast();
    
    function updateLogin(e) {
        if(e.target.id === "username-login") {
            setLogin({ ...login, username: e.target.value})
        }
        else {
            setLogin({ ...login, password: e.target.value})
        }
    }

    return (
        <Box width="50%" margin="0 auto">
            <Heading textAlign="center">Inventory Management System</Heading>
            <Heading textAlign="center">Login</Heading>
            <Stack spacing="10px" marginY="1em">
                <Input onChange={updateLogin} width='auto' variant='filled' type="text" name="username" id="username-login" placeholder="Username" required />
                <Input onChange={updateLogin} width='auto' variant='filled' type="password" name="password" id="password-login"placeholder="Password" required />
            </Stack>

            <Center>
                <ButtonGroup>
                <Button onClick={() => authenticate(login).then(response => {
                    if(response) {
                        setUsername(document.getElementById("username-login").value);
                        navigate(`items/${document.getElementById("username-login").value}`);
                        toast({
                            title: "Login successful!",
                            status: 'success',
                            duration: 4000,
                            position: 'bottom-right',
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            title: "Incorrect username or password.",
                            status: 'error',
                            duration: 4000,
                            position: 'bottom-right',
                            isClosable: true,
                        })
                    }
                })}>Login</Button>
                <Button onClick={() => navigate("/createaccount")}>Create Account</Button>
                <Button onClick={() => navigate(`/items/`)}>Continue As Guest</Button>
                </ButtonGroup>
            </Center>
        </Box>
    )
}

async function authenticate(login) {
    if(login.username && login.password) {
        return await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login)
        })
        .then(response => {
            return response.ok;
        })
    }
}