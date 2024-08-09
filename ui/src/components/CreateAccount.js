import { useNavigate } from "react-router-dom";
import { Input, Button, ButtonGroup, Box, Stack, Center, Heading, useToast } from '@chakra-ui/react';

export default function CreateAccount() {

    const navigate = useNavigate();
    const toast = useToast();

    return (
        <Box width="50%" margin="0 auto">
            <Stack spacing="10px" marginY="1em">
                <Heading textAlign="center">Create Account</Heading>
                <Input width='auto' variant='filled' type="text" name="name" id="first-name" placeholder="First Name" required />
                <Input width='auto' variant='filled' type="text" name="name" id="last-name" placeholder="Last Name" required />
                <Input width='auto' variant='filled' type="text" name="name" id="username" placeholder="Username" required />
               <Input width='auto' variant='filled' type="text" name="name" id="password" placeholder="Password" required />
            </Stack>
            
            <Center>
                <ButtonGroup>
                    <Button type="submit" onClick={() => createAccount().then(response => {
                        if(response === 201) {
                            //window.alert("Account Created!");

                            toast({
                                title: "Account Created!",
                                status: 'success',
                                duration: 4000,
                                position: 'bottom-right',
                                isClosable: true,
                            })
                            navigate("/");
                        }
                        else {
                            toast({
                                title: "Username is already taken",
                                status: 'error',
                                duration: 4000,
                                position: 'bottom-right',
                                isClosable: true,
                            })
                        }
                    })}>Submit</Button>
                    <Button onClick={() => navigate("/")}>Cancel</Button>
                </ButtonGroup>
            </Center>
        </Box>
    )
}

async function createAccount() {
    let first = document.getElementById("first-name").value;
    let last = document.getElementById("last-name").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(first && last && username && password) {
        return await fetch("http://localhost:8080/create", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first: first,
                last: last,
                username: username,
                password: password
            })
        })
        .then(response => {
            return response.status;
        })
    }
}