import { useQuery } from "@apollo/client";
import { Task } from "../components/Task/Task";
import { TaskForm } from "../components/Task/TaskForm";
import { GET_ACTIVE_TASKS, GET_DONE_TASKS, GET_TASKS_BY_USER } from "../graphql/Queries";
import { ITask } from "../types/Task";
import { Header } from "../components/Header/Header";
import { Heading, VStack } from "@chakra-ui/react";
import { USER_ID } from "../misc/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const currentUserId = Number(localStorage.getItem(USER_ID));
  console.log(currentUserId)

  useEffect(() => {
    if (currentUserId === 0) {
      navigate('/login')
    }
  }, [])

  const { loading, error, data, refetch } = useQuery(GET_TASKS_BY_USER, {
    variables: {
      "done": false,
      "userId": currentUserId,
    }
  });

  const { loading: loadingData, data: dataDone, refetch: refetchDone } = useQuery(GET_TASKS_BY_USER, {
    variables: {
      "done": true,
      "userId": currentUserId,
    }
  })


  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;

  if (loadingData) return <h1>Loading...</h1>;

  const handleUpdate = () => {
    refetch();
    refetchDone();
    console.log("handled")
  }

  return (
    <div>
      <Header />
      <div >
        <VStack >
          <Heading size="me">Create a new  task!</Heading>
          <TaskForm handleUpdate={handleUpdate} />
          <Heading size="me">Tasks</Heading>
          {data.getTasksByUserId[0] == null ? <div>No pending tasks</div> : <div></div>}
          {loading == false && data && data.getTasksByUserId.map((task: ITask) => (
            <Task key={task.id} task={task} handleUpdate={handleUpdate} />
          ))}
          <Heading size="me">Completed tasks</Heading>
          {dataDone.getTasksByUserId[0] == null ? <div>No completed tasks</div> : <div></div>}
          {loadingData == false && dataDone && dataDone.getTasksByUserId.map((task: ITask) => (
            <Task key={task.id} task={task} handleUpdate={handleUpdate} />
          ))}
        </VStack>
      </div>
    </div>
  );
};