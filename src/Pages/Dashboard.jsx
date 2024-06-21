import React, { useEffect, useState } from 'react'

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { Col, Row } from 'react-bootstrap';

import {
  
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';

import {
  
 
  
  MDBNavbarItem,
 
 
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  
} from 'mdb-react-ui-kit';
import MyContacts from '../Components/MyContacts';
import AddContact from '../Components/AddContact';
import { Link, json } from 'react-router-dom';
import { getUserContactsAPI } from '../Services/allAPIs';



function Dashboard() {
//to hold home projects details 3 nos
const [userContact, setUserContact] = useState({})




// // for header
// const [openBasic, setOpenBasic] = useState(false);







  const existingUser=JSON.parse(sessionStorage.getItem('existingUser'))
  console.log(existingUser);
  return (
    <div>
      <Row>
      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <Col lg={4}>
          <MDBNavbarBrand href='#'>
            Contact App
          </MDBNavbarBrand>
          </Col>
          <Col lg={4} style={{width:'250px'}}>
          <MDBContainer fluid>
        <MDBInputGroup tag="form"  style={{width:'300px',float:'left', marginRight:'100px'}}>
          <input className='form-control' placeholder="Search" aria-label="Search" type='Search' style={{width:'100px'}}/>
         
        </MDBInputGroup>
      </MDBContainer>
          </Col>
          <Col lg={4} >
          <MDBNavbarItem style={{float:'right'}}>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  {existingUser.username}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to={'/'}>
                  <MDBDropdownItem link>Logout</MDBDropdownItem>
                  </Link>
                  
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </Col>
        </MDBContainer>
      </MDBNavbar>
      </Row>



      <Row className='mt-5 mb-4'>
<Col>
<h2  lg={10} style={{marginLeft:'50px'}}>My Contacts</h2>
</Col>
<Col lg={2} style={{float:'right'}}>
<AddContact/>

</Col>

      </Row>



   <Row className="d-flex flex-column">
    
        <Col  lg={12} className="mb-4 d-flex flex-column">
        
        <MyContacts/>
        </Col>
     
        </Row>

     
    </div>
  )
}

export default Dashboard
