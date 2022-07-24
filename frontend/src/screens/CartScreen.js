import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function CartScreen({ match, location, history }) {

  let [searchParams, setSearchParams] = useSearchParams();
  const qty         = searchParams.get("qty");
  const params    = useParams();
  const productId = params.id

  console.log("productId: ", productId)
  console.log("qty: ", qty)

  const dispatch = useDispatch()

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <div>
        CartScreen
    </div>
  )
}

export default CartScreen