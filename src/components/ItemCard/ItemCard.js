import React from "react"
import { Card, Image } from "react-bootstrap";
import './ItemCard.css';

const ItemCard=(props)=>{
    const products=props.product
    const addToCart=props.addToCart
    

    return(
        <div>{products.map((product,id)=>(
        <Card id="item-cards" key={id}>
            <Card.Title>{product.name}</Card.Title>
            <Card.Img  src='https://cdn.dribbble.com/users/515801/screenshots/3828577/pres_001_still_2x.gif?compress=1&resize=400x300'/>
            <Card.Body>
                <Card.Text>Rs.{product.price}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                    <br></br>
                    <button className=" btn btn-primary" id="item-card-add-to-card" onClick={()=>addToCart(product)}><i className ="fa fa-shopping-cart fa-2x"></i></button>
                    <button className=" btn btn-primary" id="item-card-wishlist"><i className ="fa fa-heart-o fa-2x"></i></button>
            </Card.Body>
        </Card>
         ))}
         
        </div>
    )
}
export default ItemCard;