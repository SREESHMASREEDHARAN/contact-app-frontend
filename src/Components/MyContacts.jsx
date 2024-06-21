// import React, { useEffect, useState } from 'react'
// import {
//     MDBCard,
//     MDBCardBody,
//     MDBCardTitle,
//     MDBCardText,
//     MDBCardImage,
//     MDBBtn
    
//   } from 'mdb-react-ui-kit';
// import { getUserContactsAPI } from '../Services/allAPIs';


// function MyContacts({addContact}) {
//   console.log(addContact);
//   const [userContact, setUserContact] = useState([])
//   const allUserContact = async () =>{
//     const token = sessionStorage.getItem("token")
//     console.log(token);
//     if (token) {

//       const reqHeader = {
//         'Content-Type': 'multipart/form-data',
//         "Authorization": `Bearer ${token}`,
//       };

//       try {

//         const result = await getUserContactsAPI(reqHeader)
//         console.log(result);
//         if (result.status === 200) {
//           setUserContact(result.data)
//           console.log(userContact);
//         }
//         else {
//           alert("Failed to retrieve Contact")
//         }
//       }
//       catch (error) {
//         console.log("Error fetching projects: ", error);
//         alert("Failed to retrieve Contact")
//       }

//     }
//   }
//   useEffect(() => {
//     allUserContact()
//   }, [])
//   return (
//     <div className='text-center'>
      
        
//       {/* <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...' /> */}
//       {
//         userContact.length>0?userContact.map(item=>(
//           <MDBCard>
        
//             <img src={addContact?`${baseUrl}/uploads/${addContact?.ProjectImage}`:"null"} alt="" width={'100px'} style={{justifyContent:'center',alignItems:'center',marginLeft:'130PX'}}/>
//             {/* <img src={item.projectImage ? `${baseUrl}/uploads/${item.projectImage}` : "null"} alt="" width={'100px'} style={{justifyContent:'center',alignItems:'center',marginLeft:'130PX'}}/> */}
//           <MDBCardBody>
//         <MDBCardTitle>{item.name}</MDBCardTitle>
//         <MDBCardText>
//         {item.location}
//         </MDBCardText>
//         <MDBCardText>
//         {item.email}
//         </MDBCardText>
//         <MDBCardText>
//         {item.number}
//         </MDBCardText>
//         <MDBBtn href='#'>Call</MDBBtn>
//         <MDBBtn href='#'>Mail</MDBBtn>
//       </MDBCardBody>
//       </MDBCard>
//         ))
//         :
//         (
//           <div className='text-center'>No projects found</div>
//         )
//       }
    
//     </div>
//   )
// }

// export default MyContacts

import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import { getUserContactsAPI } from '../Services/allAPIs';

const baseUrl = "http://localhost:4000"; // Update with your backend URL

function MyContacts({ addContact }) {
  console.log(addContact);
  const [userContact, setUserContact] = useState([]);

  const allUserContact = async () => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      const reqHeader = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      };

      try {
        const result = await getUserContactsAPI(reqHeader);
        console.log(result);
        if (result.status === 200) {
          setUserContact(result.data);
          console.log(userContact);
        } else {
          alert("Failed to retrieve Contact");
        }
      } catch (error) {
        console.log("Error fetching contacts: ", error);
        alert("Failed to retrieve Contact");
      }
    }
  };

  useEffect(() => {
    allUserContact();
  }, []);

  return (
    <div className='d-flex flex-wrap justify-content-center'>
      {
        userContact.length > 0 ? userContact.map(item => (
          <MDBCard className='d-flex flex-column align-items-center m-3' key={item._id} style={{ width: '18rem' }}>
            <img className='m-3'
              src={item.projectImage ? `${baseUrl}/uploads/${item.projectImage}` : "null"}
              alt=""
              width={'100px'}
              style={{  borderRadius:'50%',width:'100px',height:'100px' }}
            />
            
            <MDBCardBody>
              <MDBCardTitle>{item.name}</MDBCardTitle>
              <MDBCardText>{item.location}</MDBCardText>
              <MDBCardText>{item.email}</MDBCardText>
              <MDBCardText>{item.number}</MDBCardText>
              <MDBBtn href='#' className='me-3' style={{width:'100px'}}>Call</MDBBtn>
              <MDBBtn href='#' style={{width:'100px'}}>Mail</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        )) : (
          <div className='text-center'>No contacts found</div>
        )
      }
    </div>
  );
}

export default MyContacts;
