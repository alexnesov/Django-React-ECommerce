import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { useParams, useNavigate } from "react-router-dom"

import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen( {history} ) {

    const navigate                               = useNavigate()

    const [name, setName]                        = useState('')
    const [email, setEmail]                      = useState('')
    const [password, setPassword]                = useState('')
    const [confirmPassword, setConfirmPassword]  = useState('')
    const [message, setMessage]                  = useState('')

    const dispatch                               = useDispatch();

    const test_param                             = useParams();

    const redirect                               = test_param.search ? test_param.search.split('=')[1] : '/'
    
    const userDetails                            = useSelector(state => state.userDetails)
    const { error, loading, user }               = userDetails

    const userLogin                              = useSelector(state => state.userLogin)
    console.log("userLogin: ", userLogin)
    const { userInfo }                           = userLogin
    
    const userUpdateProfile                     = useSelector(state => state.userUpdateProfile)
    const { success }                            = userUpdateProfile
    
    console.log("userInfo: ", userInfo)

    useEffect(() => {
        console.log("userLogin.userInfo: ", userLogin.userInfo)
        if(!userLogin.userInfo){
            console.log("====> Entered in useEffect !!!!!")
            navigate('/login')
        } else {
            if(!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userLogin.userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted!')   

        if(password != confirmPassword){
            setMessage('Passwords do not match')
        }else{
            console.log('Updating..')
            dispatch(updateUserProfile({
                'id':user._id,
                'name': name,
                'email': email,
                'password': password
            }))
        }

    }


  return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

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
                    type = 'password'
                    placeholder = 'Confirm Password'
                    value = {confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Update
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


            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
  )
}


export default ProfileScreen