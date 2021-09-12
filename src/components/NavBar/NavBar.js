import { Dropdown } from "bootstrap";
import React from "react"
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import './NavBar.css';
const NavBar=(props)=>{
  const{category,handleDropdownSelect}=props
  
  const categories=['All','Grocery','Stationery','Gadgets','Electrical Items']
    return(
      <div id="nav-bar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light"  >
       

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand" href="/" id="nav-bar-company-name">K A I S</a>
            <DropdownButton id="dropdown-basic-button" title={category} id="nav-bar-menu" onSelect={handleDropdownSelect}>
              {categories.map((category,id)=>(
              <DropdownItem key={id} eventKey={category}>{category}</DropdownItem>
              ))}
            </DropdownButton>  
            <form className="form-inline ">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" id="nav-bar-form-search-button">Search</button>
            </form>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/account" ><i className="fa fa-user fa-2x"></i></a>
              </li>
              <li className="nac-item">
                <a className="nav-link " href="/cart">
                  <i className="fa fa-shopping-cart fa-2x"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/info">
                  <i className="fa fa-info fa-2x"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/support">
                <i className="fa fa-support fa-2x"></i>
                </a>
              </li>
            </ul>
          </div>
         
        </nav>
        </div>
    )
}
export default NavBar