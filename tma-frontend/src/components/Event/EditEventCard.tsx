import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Center, Checkbox, Flex, Heading, HStack, Input, SimpleGrid, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_EVENT_BY_USER } from "../../graphql/Queries";
import { USER_ID } from "../../misc/constants";
import { Header } from "../Header/Header";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { UPDATE_EVENT } from "../../graphql/Mutations";

export function EditEventCard() {
    const { id } = useParams();
    const eventId = Number(id)
    const currentUserId = Number(localStorage.getItem(USER_ID));
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(GET_EVENT_BY_USER, {
        variables: {
            "userId": currentUserId,
            "eventId": eventId
        }
    })

    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [updateEvent] = useMutation(UPDATE_EVENT);

    useEffect(() => {
        if (!loading) {
            setTitle(data.getEventByUser.title)
            setStart(data.getEventByUser.start)
            setEnd(data.getEventByUser.end)
        }
    }, [data])

    const updateCurrentEvent = () => {
        updateEvent({
            variables: {
                "updateEventId": eventId,
                "updateEventInput": {
                    "title": title,
                    "start": start,
                    "end": end,
                }
            },
            onCompleted: () => {
                navigate('/events/')
            }
        });
    }

    if (loading) return <div>LOADING</div>
    console.log("user" + currentUserId, "event" + eventId)
    return (
        <>
            <Header />
            <VStack>
                <Heading size="md">Update Event</Heading>
                <Flex w="500px" border="2px">

                    <SimpleGrid>
                        <Box p='2'>
                            <Input w="480px"
                                type="text"
                                id="title"
                                defaultValue={data.getEventByUser.title}
                                placeholder="Task Title Min(3)"
                                className="taskInput"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}

                            />
                        </Box>

                        <HStack alignItems="center" justify="space-between">
                            <Box padding="1px" paddingLeft="3px">

                                <Heading size="sm">FROM: </Heading>
                                <Box border="1px">
                                    <DatePicker
                                        showTimeSelect
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        selected={new Date(start)}
                                        onChange={(date: Date) => {
                                            setStart(date);
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box paddingRight="3px">
                                <Heading size="sm">TO: </Heading>
                                <Box border="1px">
                                    <DatePicker
                                        showTimeSelect
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        selected={new Date(end)}
                                        onChange={(date: Date) => {
                                            setEnd(date);
                                        }}
                                    />
                                </Box>
                            </Box>
                        </HStack>


                        <Box p='2'>
                            <Heading size='md'>Start: {new Date(data.getEventByUser.start).toLocaleString()}</Heading>
                        </Box>
                        <Box p='2'>
                            <Heading size='md'>End: {new Date(data.getEventByUser.end).toLocaleString()}</Heading>
                        </Box>

                        <Center p="5px">
                            <Button onClick={() => updateCurrentEvent()}>Update Event</Button>
                        </Center>
                    </SimpleGrid>


                </Flex>



            </VStack>

        </>
    )


}