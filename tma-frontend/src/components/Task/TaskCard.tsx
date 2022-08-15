import { gql, useMutation, useQuery } from "@apollo/client";
import { Flex, Heading, Box, Button, Spacer, IconButton, SimpleGrid, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DELETE_TASK, SET_TASK_DONE } from "../../graphql/Mutations";
import { GET_TASK } from "../../graphql/Queries";
import { ITask } from "../../types/Task";
import { AiFillDelete, AiOutlineCheck, AiOutlineClose, AiOutlineEllipsis } from "react-icons/ai";
import { Header } from "../Header/Header";
import { useEffect } from "react";


type Props = {
    task: ITask;
    handleUpdate: () => void;
};

export function TaskCard() {
    const { id } = useParams();
    const taskId = Number(id)
    const navigate = useNavigate();

    useEffect(()=>{
        refetch()
    }, [])

    console.log(taskId)
    const [setTaskDone] = useMutation(SET_TASK_DONE);
    const [deleteTaskMutation, {loading: loadingDelete}] = useMutation(DELETE_TASK);
    const {data, loading, error,refetch} = useQuery(GET_TASK, { variables: {
        "getTaskId": taskId
    }});

    const setDone = (done: boolean, id: number) => {
        setTaskDone({
            variables:{
                "setTaskDoneId": id,
                "done": done
            }
        })
    }

    if (loading) return <div>Loading</div>
    console.log(data.getTask.end.toString())
    const deleteTask = (id: number) => {
        
        deleteTaskMutation({
            variables:{
                "deleteTaskId": id
            },
            onCompleted: () =>{
                navigate("/tasks")
            }
        })
        
    } 

    return(
        <div>
            
        <Header/>
        <VStack>
        <Heading size='md'>{data.getTask.name}</Heading>
        <Flex w="500px" border="2px">
            
            <SimpleGrid>            

            <Box p='2'>
                <Heading size='md'>{data.getTask.description}</Heading>
            </Box>
            <Flex display="inline-flex" p ='2'>
                <Heading size='md'>Completed:</Heading>
                <Heading size="md" p="2.5px">{data.getTask.done ===true ?  <AiOutlineCheck /> : <AiOutlineClose/>}</Heading>
            </Flex>
            <Box p='2'>
                <Heading size='md' >Start date: {new Date(data.getTask.start).toLocaleString()}</Heading>
            </Box>
            <Box p='2'>
                <Heading size='md'>Finish date: {new Date(data.getTask.end).toLocaleString()}</Heading>
            </Box>
            <Box p='2'>
            {/* <Heading size='md' >Created At: 5/29/2022, 9:12:01 PM</Heading> */}
                <Heading size='md' >Created At: {new Date(data.getTask.createdAt).toLocaleString()}</Heading>
            </Box>
            <Box p='2'>
                {/* <Heading size='md' >Created At: 5/29/2022, 9:12:43 PM</Heading> */}
                <Heading size='md'>Updated At: {new Date(data.getTask.updatedAt).toLocaleString()}</Heading>
            </Box>
            </SimpleGrid>


            <Spacer/>
            <Box p="4px">
                <IconButton 
                    bgColor="white"
                    size="xs" 
                    aria-label='Call Sage'
                    variant='outline'
                    onClick={() => {setDone((data.getTask.done === true ? false : true),data.getTask.id)}}
                    icon={data.getTask.done ===true ? <AiOutlineClose/> : <AiOutlineCheck/>}> 
                </IconButton>
                <IconButton 
                    bgColor="white"
                    size="xs" 
                    aria-label='Call Sage'
                    variant='outline' 
                    onClick={() => { navigate(`/tasks/edit/${data.getTask.id}`)}}
                    icon={<AiOutlineEllipsis/>}
                    > 
                </IconButton>


                <IconButton 
                    bgColor="white"
                    size="xs" 
                    aria-label='Call Sage'
                    variant='outline'
                    onClick={() => {deleteTask(data.getTask.id)} } 
                    icon={<AiFillDelete/>}> 
                </IconButton>
                
            </Box>
        </Flex>
        </VStack>

        </div>
    )
}
