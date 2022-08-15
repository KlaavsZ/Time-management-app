
import { useQuery } from "@apollo/client";
import { Heading, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../components/Event/Event";
import { EventForm } from "../components/Event/EventForm";
import { Header } from "../components/Header/Header";
import { TaskForm } from "../components/Task/TaskForm";
import { GET_EVENTS_BY_USER } from "../graphql/Queries";
import { USER_ID } from "../misc/constants";
import { IEvent } from "../types/Event";

export function EventList(){
    const navigate = useNavigate();
    const currentUserId = Number(localStorage.getItem(USER_ID));

    const {loading, data, error, refetch} = useQuery(GET_EVENTS_BY_USER,{
        variables:{
            "userId": currentUserId,
        }
    });

    useEffect(()=>{
        refetch()
    }, [])

    const handleUpdate = () => {
        refetch();
        console.log("handled")
      }

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Something went wrong!</h1>;


    return(<div>
        <Header/>
        <div >
          
            <VStack>
            <Heading size="me">Create a new event!</Heading>
            <EventForm handleUpdate={handleUpdate}/>
            <Heading size="me">Events</Heading>
            {data.getAllEventsByUser[0] == null ? <div>No upcoming events!</div> : <div></div>}
              {loading == false && data && data.getAllEventsByUser.map((task: IEvent) => (
                   <Event key={task.id} event={task} handleUpdate={handleUpdate} />
               )) }
            </VStack>
        </div>
        </div>
    )
}