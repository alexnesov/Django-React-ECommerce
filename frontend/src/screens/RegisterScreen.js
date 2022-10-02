import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import { useParams, useNavigate } from "react-router-dom"




function RegisterScreen({ location, history }) {


    const navigate                               = useNavigate()

    const [name, setName]                        = useState('')
    const [email, setEmail]                      = useState('')
    const [password, setPassword]                = useState('')
    const [confirmPassword, setConfirmPassword]  = useState('')
    const [message, setMessage]                  = useState('')

    const dispatch                               = useDispatch()
    const test_param                             = useParams();
    const redirect                               = test_param.search ? test_param.search.split('=')[1] : '/'
    const userLogin                              = useSelector(state => state.userLogin)
    console.log("userLogin: ", userLogin)

    const userRegister                  = useSelector(state => state.userRegister)
    const { error, loading, userInfo }  = userRegister
    
    
    console.log("userInfo: ", userInfo)

    useEffect(() => {
        console.log("userLogin.userInfo: ", userLogin.userInfo)
        if(userLogin.userInfo){
            console.log("====> Entered in useEffect !!!!!")
            navigate('/')
        }
    }, [userLogin.userInfo, redirect])

    console.log("test_param: ", test_param)

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted!')   

        if(password != confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password))
        }

    }


  return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type = 'email'
                        placeholder = 'Enter Email'
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type = 'password'
                    placeholder = 'Enter Password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type = 'password'
                    placeholder = 'Confirm Password'
                    value = {confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Register
            </Button>

            <Row className='py-3'>
                <Col>
                    Have an Account? 
                    <Link to = {redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Sign In
                    </Link>

                </Col>
            </Row>

            </Form>
        </FormContainer>

    )
}

export default RegisterScreen