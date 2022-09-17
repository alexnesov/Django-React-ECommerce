import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

import { useParams, useNavigate } from "react-router-dom"

function LoginScreen({location}) {


    const navigate                  = useNavigate()
    const [email, setEmail]         = useState('')
    const [password, setPassword]   = useState('')

    const dispatch                  = useDispatch()
    const test                      = useParams();
    const redirect                  = test.search ? test.search.split('=')[1] : '/'
    const userLogin                 = useSelector(state => state.userLogin)

    console.log("userLogin: ", userLogin)
    const { error, loading, userInfo } = userLogin
    console.log("userInfo: ", userInfo)

    useEffect(() => {
        if(userInfo){
            navigate('/')
        }
    }, [userInfo, redirect])

    console.log("test: ", test)

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted!')   
        dispatch(login(email, password))
    }

  return (
    <FormContainer className='form_container_login'>
        <h1>Sign In</h1>

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>


            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit'>
                Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer? <Link 
                to={redirect ? `/register?redirect=${redirect}` : '/register'}> 
                Register 
                </Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default LoginScreen