import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput
} from 'mdb-react-ui-kit';
import uploadImg from '../Assets/1.png'
import { addContactAPI } from '../Services/allAPIs';
function AddContact() {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [staticModal, setStaticModal] = useState(false);
  const toggleOpen = () => setStaticModal(!staticModal);
  const [token,setToken]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"));
    }
  },[])



    //to hold project details
    const[contactDetails,setcontactDetails]=useState({
        name:"",location:"",email:"",number:"",ProjectImage:""
      })
      console.log(contactDetails);
      //to hold the image url
      const[preview,setPreview]=useState("")
      console.log(preview);
      useEffect(()=>{
        if(contactDetails.ProjectImage){
          setPreview(URL.createObjectURL(contactDetails.ProjectImage))
        }
      },[contactDetails.ProjectImage])


      const contactAdd=async()=>{
        const {name,location,email,number,ProjectImage} = contactDetails
        if(!number || !name || !location || !email || !ProjectImage){
          alert("Please enter deatils")
        }
        else{
          const reqBody=new FormData()
          reqBody.append("name",name)
          reqBody.append("location",location)
          reqBody.append("email",email)
          reqBody.append("number",number)
          reqBody.append("projectImage",ProjectImage)
    
          const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
        }
        const result=await addContactAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          console.log(result.data);
          alert("Contact added Successfully")
       
        setcontactDetails({
            name:"",location:"",email:"",number:"",ProjectImage:""
          })
          setPreview("")
          handleClose()
        }
        else{
          alert(result.response.data)
          console.log(result.response.data);
        }
        }
        
      }
  return (
    <div>
      <MDBBtn onClick={toggleOpen}>+ ADD CONTACT</MDBBtn>

      <MDBModal staticBackdrop tabIndex='-1' open={staticModal} onClose={() => setStaticModal(false)}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <label>
          <input onChange={e=>setcontactDetails({...contactDetails,ProjectImage:e.target.files[0]})} type="file" style={{ display: "none" }}/>
          <img  src={preview?preview:uploadImg} alt="" width={'100px'}/>
        </label>
            </MDBModalBody>
            <MDBModalBody>
            <MDBInput value={contactDetails.name} onChange={e=>setcontactDetails({...contactDetails,name:e.target.value})} label="Name" id="form1" type="text" />
            </MDBModalBody>
            <MDBModalBody><MDBInput value={contactDetails.location} onChange={e=>setcontactDetails({...contactDetails,location:e.target.value})} label="Location" id="form1" type="text" /></MDBModalBody>
            <MDBModalBody><MDBInput value={contactDetails.email} onChange={e=>setcontactDetails({...contactDetails,email:e.target.value})} label="Email" id="form1" type="text" /></MDBModalBody>
            <MDBModalBody><MDBInput value={contactDetails.number} onChange={e=>setcontactDetails({...contactDetails,number:e.target.value})} label="Number" id="form1" type="text" /></MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={contactAdd}>Save</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default AddContact
