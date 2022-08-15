import { ApolloCache, FetchResult, useMutation } from "@apollo/client";
import React, { FormEvent, useEffect, useState } from "react";
import { ADD_TASK, SET_TASK_DONE, UPDATE_TASK } from "../../graphql/Mutations";
import { GET_ACTIVE_TASKS, GET_ALL_TASKS_BY_USER, GET_TASK_BY_USER } from "../../graphql/Queries";
import { DocumentNode, useQuery } from "@apollo/react-hooks";
import { Box, Button, Center, Checkbox, Flex, Heading, HStack, Input, SimpleGrid, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { USER_ID } from "../../misc/constants";
import { Header } from "../Header/Header";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export function EditTaskForm() {
    const { id } = useParams();
    const taskId = Number(id)
    const currentUserId = Number(localStorage.getItem(USER_ID));
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(GET_TASK_BY_USER, {
        variables: {
            "userId": currentUserId,
            "taskId": taskId
        }
    })

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [done, setDone] = useState(false)
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [updateTask] = useMutation(UPDATE_TASK);

    useEffect(() => {
        if (!loading) {
            setName(data.getTaskByUser.name)
            setDescription(data.getTaskByUser.description)
            setDone(data.getTaskByUser.done)
            setStart(data.getTaskByUser.start)
            setEnd(data.getTaskByUser.end)
        }

    }, [data])



    if (loading) return <div>LOADING</div>

    const updateCurrentTask = () => {
        console.log(name, description)
        updateTask({
            variables: {
                "updateTaskId": taskId,
                "input": {
                    "name": name,
                    "description": description,
                    "done": done,
                    "start":start,
                    "end":end
                }
            },
            onCompleted: () => {
                navigate('/tasks/' + taskId)
            }
        });
    }

    return (
        <>
            <Header />
            <VStack>
                <Heading size="md">Update Task</Heading>
                <Flex w="500px" border="2px">

                    <SimpleGrid>
                        <Box p='2'>
                            <Input w="480px"
                                type="text"
                                id="name"
                                defaultValue={data.getTaskByUser.name}
                                placeholder="Task Name"
                                className="taskInput"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}

                            />
                        </Box>
                        <Box p='2'>
                            <Input w="480px"
                                type="text"
                                id="description"
                                placeholder="Task Description"
                                className="taskInput"
                                defaultValue={data.getTaskByUser.description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
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
                                        onChange={(startDate: Date) => {
                                            setStart(startDate);
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
                                        onChange={(endDate: Date) => {
                                            setEnd(endDate);
                                        }}
                                    />
                                </Box>
                            </Box>
                        </HStack>
                        
                        <Box p='2'>
                            <Heading size='md'>Completed:
                                <Checkbox padding="3px" size="lg" defaultChecked={data.getTaskByUser.done ? true : false}
                                    onChange={() => { setDone(!done) }}></Checkbox>
                            </Heading>

                        </Box>
                    
                        <Center p="5px">
                    <Button onClick={() => updateCurrentTask()}>Update Task</Button>
                </Center>

                    </SimpleGrid>

                </Flex>

            </VStack>

        </>
    )
}
