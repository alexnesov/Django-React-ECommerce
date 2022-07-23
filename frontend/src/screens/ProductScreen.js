import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'


function ProductScreen({ match, history }){

    const [qty, setQty] = useState(1)

    const dispatch  = useDispatch()
    const params    = useParams();

    const productDetails = useSelector(state => state.productDetails)

    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(params.id))
    }, [dispatch, match])
  

    const addToCartHandler = () =>{
        console.log('Add to cart', params.id)
        console.log('History, ', match)
        history.push(`/cart/${params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to = '/'className="btn btn-light my-3">Go Back</Link>

            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                : (
                    <Row>
                <Col md={6}>
                    <Image src={product.image} style={{maxWidth: "600px"}}/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value = {product.rating} 
                                    text={`${product.numReviews} reviews`}
                                    color={'#f8e825'}
                                    />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>

                    <Card>
                        <ListGroup variant="flush">

                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                    <strong>
                                        ${product.price}
                                    </strong>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                    <strong>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                                    </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Select 
                                            as       = "select"
                                            value    = {qty}
                                            onChange = {(e) => setQty(e.target.value)}
                                            > 
                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x+1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button className   = "btn-block" 
                                        onClick     = {addToCartHandler}
                                        type        = "button"
                                        disabled    = {product.countInStock == 0}>Add to Cart</Button>
                            </ListGroup.Item>


                        </ListGroup>
                    </Card>
                </Col>

            </Row>         
                )
            
            }

        
        </div>
    )
}


export default ProductScreen