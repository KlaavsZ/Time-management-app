import { IEvent } from "../../types/Event"
import { Flex, Heading, Box, Button, Spacer, IconButton, VStack, HStack, Text } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { DELETE_EVENT } from "../../graphql/Mutations";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete, AiOutlineEllipsis } from "react-icons/ai";

type Props = {
    event: IEvent,
    handleUpdate: () => void;
}

export const Event: React.FC<Props> = ({ event, handleUpdate }) => {
    const { id, title, start, end } = event;
    const [deleteEventMutation] = useMutation(DELETE_EVENT)
    const navigate = useNavigate();


    const deleteEvent = (id: number) => {
        console.log(id)
        deleteEventMutation({
            variables: {
                "deleteEventId": id
            },
            onCompleted: () => {
                handleUpdate();
            }
        })
        console.log("clicked")
    }

    return (
        <Flex w="500px" border="2px">
            <HStack>

                <Box p='2' w="150px" >
                    <Heading size='md'>{title}</Heading>
                </Box>

                <Spacer />
                
                {start == end ? (
                <Box>
                    <Text size='sm'>At: {new Date(start).toLocaleString()}</Text>
                </Box>
                ) : (

                <Box>
                <VStack align="left"  >
                    <Box >
                        <Text size='sm'>From: {new Date(start).toLocaleString()}</Text>
                    </Box>

                    <Box >
                        <Text size='sm' alignSelf="left">To: {new Date(end).toLocaleString()}</Text>
                    </Box>
                </VStack>
                </Box>
            )}
            </HStack>
            
            <Spacer />


            <Box p="4px">


                <IconButton
                    bgColor="white"
                    size="xs"
                    aria-label='Call Sage'
                    variant='outline'
                    icon={<AiOutlineEllipsis />}
                    onClick={() => { navigate(`/events/edit/${event.id}`) }}
                >

                </IconButton>

                <IconButton
                    bgColor="white"
                    size="xs"
                    aria-label='Call Sage'
                    variant='outline'
                    onClick={() => { deleteEvent(event.id) }}
                    icon={<AiFillDelete />}>
                </IconButton>

            </Box>
        </Flex>

    )
}