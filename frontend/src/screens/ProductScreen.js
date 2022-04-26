import React from "react";
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import { useParams } from "react-router-dom";


function ProductScreen(){


    const params = useParams();
    console.log(params)

    const product = products.find((p) => p._id == params.id)

    return (
        <div>
            {product.name}
        </div>
    )
}


export default ProductScreen