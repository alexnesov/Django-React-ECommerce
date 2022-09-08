import React, { useState, useEffect, useInsertionEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useParams } from "react-router-dom";

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import { login } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux';

function LoginScreen() {

  const params                  = useParams();
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const dispatch                = useDispatch()

  console.log('params: ', params)

  const redirect  = params.search ? params.search.split('=')[1] : '/'
  const userLogin = useSelector(state => state.userLogin)

  console.log("userLogin: ", userLogin)

  const {error, loading, userInfo} = userLogin


  useEffect(() => {
    if(userInfo){
      params.history.push(redirect)
    }
  }, [params.history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Submitted')
    dispatch(login(email, password))
  }


  return (
    <FormContainer>

      <h1>Sign In</h1>

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type        = 'email'
            placeholder ='Enter Email'
            value       = {email}
            onChange    = {(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type        = 'password'
            placeholder = 'Enter Password'
            value       = {password}
            onChange    = {(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In</Button>

      </Form>

      <Row className='py-3'>
        <Col>
          New Customer ? <Link 
            to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default LoginScreen