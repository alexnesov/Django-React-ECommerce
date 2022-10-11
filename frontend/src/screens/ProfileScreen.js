import React, { useState, useEffect } from 'react';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../actions/userActions';

import { useParams, useNavigate } from "react-router-dom"


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
    

    
    console.log("userInfo: ", userInfo)

    useEffect(() => {
        console.log("userLogin.userInfo: ", userLogin.userInfo)
        if(!userLogin.userInfo){
            console.log("====> Entered in useEffect !!!!!")
            navigate('/login')
        }
    }, [userLogin.userInfo, redirect])


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
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
  )
}


export default ProfileScreen