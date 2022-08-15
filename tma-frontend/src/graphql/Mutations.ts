import { gql } from "@apollo/client";

//TASKS
export const ADD_TASK = gql`
mutation createTask($createTaskInput: CreateTaskInput!){
  createTask(input: $createTaskInput) {
      id
      name
      description
      createdAt
      updatedAt
  }
}
`

export const UPDATE_TASK = gql`
mutation updateTask($updateTaskId: Int!, $input: UpdateTaskInput!){
  updateTask(id: $updateTaskId, input: $input){
    name
    description
    done
    createdAt
    updatedAt
  }
}
`

export const DELETE_TASK = gql`
mutation deleteTask($deleteTaskId: Int!){
  deleteTask(id: $deleteTaskId)
}
`

export const SET_TASK_DONE = gql`
mutation setTaskDone($setTaskDoneId: Int!, $done: Boolean!) {
  setTaskDone(id: $setTaskDoneId, done: $done) {
    id name done
  }
}
`
//AUTHENTICATION
export const LOGIN = gql`
mutation Login($loginUserInput: LoginUserInput!) {
  login(loginUserInput: $loginUserInput) {
    user {
      id
      username
    }
    accessToken
  }
} 
`
export const SIGNUP = gql`
mutation Signup($createUserInput: CreateUserInput!) {
signup(createUserInput: $createUserInput) {
    id
    username

}
}
`
//EVENTS
export const CREATE_EVENT = gql`
mutation CreateEvent($createEventInput: CreateEventInput!) {
  createEvent(createEventInput: $createEventInput) {
    id
    title
    start
    end
  }
}
`

export const UPDATE_EVENT = gql`
mutation UpdateEvent($updateEventId: Int!, $updateEventInput: UpdateEventInput!) {
  updateEvent(id: $updateEventId, updateEventInput: $updateEventInput) {
    title
    start
    end
  }
}
`

export const DELETE_EVENT = gql`
mutation DeleteEvent($deleteEventId: Int!) {
  deleteEvent(id: $deleteEventId)
}
`

