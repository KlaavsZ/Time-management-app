import { ApolloCache, FetchResult, useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { ADD_TASK, SET_TASK_DONE } from "../../graphql/Mutations";
import { GET_ACTIVE_TASKS } from "../../graphql/Queries";
import { ITask } from "../../types/Task";
import { DocumentNode, useQuery } from "@apollo/react-hooks";
import { Box, Button, Center, Flex, Heading, HStack, Input, SimpleGrid, VStack } from "@chakra-ui/react";
import { USER_ID } from "../../misc/constants";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    handleUpdate: () => void;
};

export const TaskForm: React.FC<Props> = ({ handleUpdate }) => {
    const currentUserId = Number(localStorage.getItem(USER_ID));
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>(new Date());


    const [createTask, { loading }] = useMutation(ADD_TASK);

    const addTask = () => {
        console.log(start, end)
        createTask({
            variables: {
                "createTaskInput": {
                    "userId": currentUserId,
                    "name": name,
                    "description": description,
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
                    placeholder="Title: Min(3) Max(30)"
                    className="taskInput"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />                    
                <Input
                type="text"
                id="description"
                placeholder="Description: Min(0), Max(30)"
                className="taskInput"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
                </Box>
                        <HStack alignItems="center" justify="space-between">
                            <Box paddingLeft="3px">

                                <Heading size="sm">FROM: </Heading>
                                <Box border="1px">
                                    <DatePicker
                                        showTimeSelect
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        selected={new Date(start)}
                                        onChange={(date: Date) => {
                                            setStart(date);
                                            console.log("Changed into "+date)
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
                    <Button onClick={() => addTask()}>Create Task</Button>
                </Center>
                </SimpleGrid>
            </Flex>
        </>
    )
}