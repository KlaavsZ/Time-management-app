import { gql, useQuery } from "@apollo/client";

export const GET_ALL_TASKS = gql`
query GET_TASKS {
    tasks {
      id
      name
      description
      done
      createdAt
      updatedAt
      start
      end
    }
  }
`

export const GET_TASK = gql`
query GetTask($getTaskId: Int!){
  getTask(id: $getTaskId) {
    id
    name
    description
    done
    createdAt
    updatedAt
    start
    end
  }
}
`
export const GET_TASK_BY_USER = gql`
query GetTaskByUser($userId: Int!, $taskId: Int!) {
  getTaskByUser(userId: $userId, taskId: $taskId) {
    id
    name
    description
    done
    createdAt
    updatedAt
    start
    end
  }
}
`
export const GET_TASKS_BY_USER = gql`
query GetTasksByUserId($done: Boolean!, $userId: Int!) {
  getTasksByUserId(done: $done, userId: $userId) {
    id
    name
    description
    done
    createdAt
    updatedAt
    start
    end
  }
}
`
export const GET_ALL_TASKS_BY_USER = gql`
query GetAllTasksByUserId($userId: Int!) {
  getAllTasksByUserId(userId: $userId) {
    id
    name
    description
    done
    createdAt
    updatedAt
    start
    end
  }
}
`

export const GET_DONE_TASKS = gql`
query getDoneTasks {
  getTasks(done: true) {
    id
    name
    description
    done
    createdAt
    updatedAt
    start
    end
  }
}
`
export const GET_ACTIVE_TASKS = gql`
query getDoneTasks {
  getTasks(done: false) {
    id
    name
    description
    done
    createdAt
    updatedAt
    start
    end
  }
}
`
//EVENTS

export const GET_EVENT_BY_USER = gql`
query GetEventByUser($userId: Int!, $eventId: Int!) {
  getEventByUser(userId: $userId, eventId: $eventId) {
    id
    title
    start
    end
    start
    end
  }
}
`

export const GET_EVENTS_BY_USER = gql`
query GetAllEventsByUser($userId: Int!) {
  getAllEventsByUser(userId: $userId) {
    id
    title
    start
    end
    start
    end
  }
}
`
