import { gql, useMutation, useQuery } from "@apollo/client";
import { Flex, Heading, Box, Button, Spacer, IconButton, HStack, VStack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DELETE_TASK, SET_TASK_DONE } from "../../graphql/Mutations";
import { GET_TASK } from "../../graphql/Queries";
import { ITask } from "../../types/Task";
import { AiFillDelete, AiOutlineCheck, AiOutlineCheckCircle, AiOutlineClose, AiOutlineEllipsis } from "react-icons/ai";
type Props = {
    task: ITask;
    handleUpdate: () => void;
};

export const Task: React.FC<Props> = ({ task, handleUpdate }) => {
    const [setTaskDone, { loading: loadingDone }] = useMutation(SET_TASK_DONE);
    const [deleteTaskMutation, { loading: loadingDelete }] = useMutation(DELETE_TASK);
    const { id, name, description, done, createdAt, updatedAt, start, end } = task;
    const navigate = useNavigate();

    const setDone = (done: boolean, id: number) => {
        setTaskDone({
            variables: {
                "setTaskDoneId": id,
                "done": done
            },
            onCompleted: () => {
                handleUpdate();
            }
        })
        handleUpdate();
    }

    const deleteTask = (id: number) => {
        console.log("delete Button clicked")
        deleteTaskMutation({
            variables: {
                "deleteTaskId": id
            },
            onCompleted: () => {
                handleUpdate();
            }
        })
    }


    return (
        <Flex w="500px" border="2px">
            <HStack>
                <Box p='2' w="150px" >
                    <Heading size="sm">{name}</Heading>
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
            <Box p="4px" verticalAlign="center">
                <IconButton
                    bgColor="white"
                    size="xs"
                    aria-label='Call Sage'
                    variant='outline'
                    onClick={() => { setDone((task.done === true ? false : true), task.id) }}
                    icon={task.done === true ? <AiOutlineClose /> : <AiOutlineCheck />}>
                </IconButton>
                <IconButton
                    bgColor="white"
                    size="xs"
                    aria-label='Call Sage'
                    variant='outline'
                    icon={<AiOutlineEllipsis />}
                    onClick={() => { navigate(`/tasks/${task.id}`) }}
                >
                </IconButton>
                <IconButton
                    bgColor="white"
                    size="xs"
                    aria-label='Call Sage'
                    variant='outline'
                    onClick={() => { deleteTask(task.id) }}
                    icon={<AiFillDelete />}>
                </IconButton>
            </Box>
        </Flex>

    )

}