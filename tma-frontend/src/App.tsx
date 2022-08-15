import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskList } from './views/TaskList';
import { TaskCard } from './components/Task/TaskCard';
import { Login } from './components/Authentication/Login';
import { EditTaskForm } from './components/Task/EditTaskCard';
import { ACCESS_TOKEN } from './misc/constants';
import { Calendar } from './views/Calendar';
import { EventForm } from './components/Event/EventForm';
import { EventList } from './views/EventList'
import { EditEventCard } from './components/Event/EditEventCard';
import { RequireAuth } from './components/Authentication/RequireAuth';

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client = {client}>
        <Routes>

          <Route path = "/login" element={<Login/>} ></Route>
          <Route path = "/" element={<RequireAuth/>}>
            {/* TASKS */}
            <Route path ="/" element={<Navigate to="/events"/>}></Route>
            <Route path = "/tasks/:id"  element={<TaskCard/>}></Route>
            <Route path = "/tasks/edit/:id" element={<EditTaskForm/>}></Route>s
            <Route path = "/tasks" element={<TaskList/>}></Route>
            {/* EVENTS */}
            <Route path = "/events" element={<EventList/>}></Route>
            <Route path = "/events/edit/:id" element={<EditEventCard/>}> </Route>
            {/* CALENDAR */}
            <Route path = "/calendar"  element={<Calendar/>}></Route>
          </Route>

        </Routes>
    </ApolloProvider>
  );
}

export default App;
