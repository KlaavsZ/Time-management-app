import { gql, useMutation } from '@apollo/client';
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LOGIN, SIGNUP } from '../../graphql/Mutations';
import { ACCESS_TOKEN, USERNAME, USER_ID } from '../../misc/constants';

export const Login = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    login: true,
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    errorMessage:''
  });

const [login] = useMutation(LOGIN, {
    variables: {
      "loginUserInput": {
        "username": formState.username,
        "password": formState.password,
      }
    },
    onCompleted: ({ login }) => {
    console.log("LOGIN CALLED");
      localStorage.setItem(USERNAME, login.user.username);
      localStorage.setItem(ACCESS_TOKEN, login.accessToken);
      localStorage.setItem(USER_ID, login.user.id);
      navigate('/tasks');
    }
  });
  
  const [signup, {error}] = useMutation(SIGNUP, {
    variables: {
        "createUserInput": {
            "email": formState.email,
            "username": formState.username,
            "password": formState.password,
          },
    },onError(err){
      console.log(err)
    },
    onCompleted: () => {
        console.log("SIGNUP CALLED");
        formState.login = true;
      navigate('/login');

    }
  });

  const register = () => {
    console.log(formState.username, formState.password)
    console.log(formState.password === formState.passwordConfirm)
    if(formState.password === formState.passwordConfirm){
      signup();
    }
  }

  console.log(formState)
  console.log(formState.errorMessage)
  
  return(
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>

    <Stack spacing={8} py={12} px={6}>
      <Stack align={'center'}>
        <Heading > {formState.login ? 'Login' : 'Register'}</Heading>

      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
  
          {formState.login ? (
            <div></div>
          ) : 
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input required={true} minLength={5}
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
              })
            }
            type="text"
            placeholder="E-mail @IsEmail"
          />
          </FormControl>   
        }

          <FormControl >
            <FormLabel>Username</FormLabel>
            <Input value={formState.username} 
            onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value
            })
          }
          type="text"
          placeholder="Username"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input 
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value
              })
            }
            type="password"
            placeholder="Password"
          />
          </FormControl>   

        <div>
          {formState.login ? 
            <div></div>
           : 
          <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input 
          onChange={(e) =>
            setFormState({
              ...formState,
              passwordConfirm: e.target.value
            })
          }
          type="password"
          placeholder="Confirm Password"
        />
        </FormControl>
        }

        </div>  


          <Stack spacing="10">
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Text color={'blue.400'} onClick={(e) => setFormState({
                ...formState,
              login: !formState.login
            })
           }>  
           
           {formState.login ? 'Need to create an account?' : 'Already have an account?'}</Text>
            </Stack>
            <Button onClick={()=> formState.login ? login() : register()}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              {formState.login ? 'Login ' : 'Create an account '}

            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
};