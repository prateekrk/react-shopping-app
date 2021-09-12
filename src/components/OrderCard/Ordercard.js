import { Card } from "react-bootstrap";
import './Ordercard.css'
const Ordercard=(props)=>{

    const orders=props.orders;
    return(
       <div>{orders.map((order,id)=>(
           <Card key={id} id="order-card">
               <h6>Order Id:</h6>
               <Card.Title>{order.id}</Card.Title>
               <Card.Text>Delivered To : {order.customerAddress}</Card.Text>
               <Card.Text>Delivered On : MM-DD-YYYY</Card.Text>
               <Card.Text>Total: Rs.{order.total}/-</Card.Text>
               <Card.Text className="font-weight-bold">Items Ordered : </Card.Text>
               <>{order.items.map((item,id)=>(
                   <Card.Text key={id} id="order-card-item">{item.productCode}</Card.Text>
               ))}</>
               <button className="btn btn-primary" id="order-card-view-order-details-button">View Order Details</button>
           </Card>
       ))}</div> 
    )
}
export default Ordercard