import { useMutation } from "@apollo/client";
import { Box, Button, Center, Flex, Heading, HStack, Input, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { ADD_TASK, CREATE_EVENT } from "../../graphql/Mutations";
import { USER_ID } from "../../misc/constants";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    handleUpdate: () => void;
};

export const EventForm: React.FC<Props> = ({ handleUpdate }) => {
    const currentUserId = Number(localStorage.getItem(USER_ID));
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const navigate = useNavigate();

    const [createEvent, { loading }] = useMutation(CREATE_EVENT);

    const addEvent = () => {
        createEvent({
            variables: {
                "createEventInput": {
                    "userId": currentUserId,
                    "title": title,
                    "start": start,
                    "end": end
                }
            },
            onCompleted: () => {
                handleUpdate();
            }
        });
    };

    return (
        <>
                <Flex  border="2px" w="500px">
                <SimpleGrid w="500px">
                    <Box padding="3px">
                <Input 
                    type="text"
                    id="name"
                    placeholder="Title: Min(3)"
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
                            <Box  paddingRight="3px">
                                <Heading size="sm">TO: </Heading>
                                <Box border="1px" >
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
                        <Center p="5px">
                    <Button onClick={() => addEvent()}>Create an event</Button>
                </Center>
                </SimpleGrid>
            </Flex>
        </>
    )


}