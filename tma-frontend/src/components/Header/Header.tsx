import {Flex, Button, IconButton, Link, Heading, Text, Box, Spacer} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, USERNAME } from '../../misc/constants';

export const Header = () =>{

    const navigate = useNavigate();
    const acessToken = localStorage.getItem(ACCESS_TOKEN);
    const username = localStorage.getItem(USERNAME);
    return(
        <Flex justify="center" bg="gray.200" as="header">
            <Flex justify="center" height="60px" p="2" mr="4" >

              <Box padding="9px">
            <Text >User: <u>{username}</u></Text> 
              </Box>

                <Link href="/tasks" variant="solid">
                    <Button 
                    h="100%"
                    variant="ghost"
                    aria-label="Contact"
                    w="100%"
                    outline=""
                    >TASKS</Button>
                </Link>

                <Link href="/events" variant="solid">
                    <Button 
                    h="100%"
                    variant="ghost"
                    aria-label="Contact"
                    w="100%"
                    outline=""
                    >EVENTS</Button>
                </Link>

                <Link href="/calendar">
                    <Button 
                    h="100%"
                    variant="ghost"
                    aria-label="Contact" 
                    >CALENDAR</Button>
                </Link>

                <Button 
                color="red"
                    h="100%"
                    variant="ghost"
                    aria-label="Contact"
                    onClick={() => {
                      localStorage.clear()
                      navigate(`/login`);
                    }} 
                    >Log out
                </Button>
               

            </Flex>
        </Flex>
    )
}