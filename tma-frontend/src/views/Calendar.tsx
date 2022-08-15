import FullCalendar, { EventSourceInput } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { Box, Button, Center, Container, Flex, HStack, VStack } from "@chakra-ui/react"
import { Header } from "../components/Header/Header"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_EVENTS_BY_USER, GET_TASK, GET_TASKS_BY_USER } from "../graphql/Queries"
import { USER_ID } from "../misc/constants"
import { useRef, useState } from "react"
import { ITask } from "../types/Task"
import { IEvent } from "../types/Event"
import moment from 'moment'

export const Calendar = () => {

    const navigate = useNavigate();
    const currentUserId = Number(localStorage.getItem(USER_ID));
    const calendarRef = useRef(null);

    let allEvents: EventSourceInput = []
    let done = false;

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
    });
    const { loading: eventLoading, data: eventData, error: eventError } = useQuery(GET_EVENTS_BY_USER, {
        variables: {
            "userId": currentUserId,
        }
    });

    let eventList: EventSourceInput = [], taskList: EventSourceInput = [], taskDoneList: EventSourceInput = []

if (!loading && !loadingData && !eventLoading) {
    taskList = data.getTasksByUserId.map((task: ITask) => (
        { title: task.name, start: task.start, end: task.end, color: 'red',  }
    ))

        taskDoneList = dataDone.getTasksByUserId.map((task: ITask) => (
            { title: task.name, start: task.start, end: task.end, color: 'green', }
        ))

        eventList = eventData.getAllEventsByUser.map((event: IEvent) => (
            { title: event.title, start: event.start, end: event.end, color: 'blue', }
        ))
        done = true;
    }
    if (done) {
        allEvents = Array.prototype.concat(taskList, taskDoneList, eventList)
    }

    console.log(allEvents)

    {
        return (
            <div>
                <Header></Header>
                <Flex justifyContent="space-between">
                    <HStack>
                    <Container  bg='green' color='white'>
                        CompletedTasks
                    </Container>
                    <Container  bg='red' color='white'>
                        PendingTasks 
                    </Container>
                    <Container  bg='blue' color='white'>
                        Events
                    </Container>
                    </HStack>
                    <Box>
                    <Button colorScheme="blackAlpha" margin="0.3px" width="83px" onClick={() => navigate('/tasks')} >Tasks</Button>
                    <Button colorScheme="blackAlpha" margin="0.3px" width="83px" onClick={() => navigate('/events')} >Events</Button>
                    </Box>
                </Flex >
                <Box >
                    {(!loading || !loadingData || !eventLoading || done) ? (
                        <FullCalendar plugins={[dayGridPlugin]}
                            firstDay={1}
                            height={"850px"}
                            initialView="dayGridMonth"
                            events={allEvents}
                            displayEventEnd={true}
                            eventTimeFormat={{
                                hour: 'numeric',
                                minute: '2-digit',
                                meridiem: 'short'
                            }}
                        ></FullCalendar>
                    ) : (<div></div>)}

                </Box>
            </div>
        )
    }
}