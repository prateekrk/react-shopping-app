import useFetch from "../../services/useFetch"
import ItemCard from "../ItemCard/ItemCard";
import React from "react"
import category from "../NavBar/NavBar";

const Home=(props)=>{
  const{category,setCategory,addToCart,setCart}=props
  
    let desiredCategory=props.category;
    if(desiredCategory==='Categories'){
      desiredCategory=''
    }
    if(category==='All'){
      desiredCategory=''
    }
    const {data:products,isPending,error}=useFetch("http://localhost:8084/products/"+desiredCategory)



    return (
        <div className="home">
          <marquee>
            10% OFF ON ALL ELECTRICAL PRODUCTS&nbsp;&nbsp;
            FREE SHOPPING ON ORDER ABOVE RS.699/-&nbsp;&nbsp;
            4 DAYS DELIVERY PROMISE(T&C)&nbsp;&nbsp;
            WITH 💙 K A I S GROUP
          </marquee>
        {isPending && <div>Loading......</div>}
        {error && <div> {error} </div>}
        {products && <ItemCard product={products} addToCart={addToCart} />}
        </div>
      );
}
export default Home