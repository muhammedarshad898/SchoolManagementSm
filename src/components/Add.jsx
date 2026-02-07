import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col,Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addstudent } from '../services/Allapi';
import { responseContext } from '../contextapi/ContextProvider';

function Add() {
    const [show, setShow] = useState(false);
    const [preview,setpreview]=useState("")
   const[Student,setstudent]=useState({
    first_name:"",last_name:"",batch:"",phone:"",image:""
   })
   const {setresponse}=useContext(responseContext)
   const handleAddstudent=async()=>{
    console.log(Student)
    const {first_name,last_name,batch,phone,image}=Student
    if(!first_name||!last_name||!batch||!phone||!image){
    toast.warning("Enter a valid input")
    }
    else{
      const fd=new FormData()
      fd.append('first_name',first_name)
      fd.append('last_name',last_name)
      fd.append('batch',batch)
      fd.append('phone',phone)
      fd.append('image',image)
      const header={
        'Content-Type':'multipart/form-data',
        'Authorization':`Token ${sessionStorage.getItem('token')}`
      }
      const res=await addstudent(fd,header)
      console.log(res)
      if(res.status==201){
        toast.success("student detail added")
        handleClose()
        setresponse(res)
      }
      else{
        toast.error("adding failed")
      }
    }
   }
   useEffect(()=>{
    if(Student.image){
      setpreview(URL.createObjectURL(Student.image))
    }
    else{
      setpreview("")
    }
    
  },[Student.image])

  const handleClose = () =>{
    setShow(false);
    setstudent({
      first_name:"",last_name:"",batch:"",phone:"",image:""
     })

  }
    
   

  
 
  const handleShow = () => setShow(true);
  return (
    <>
     <Button variant="light" className="btn-brand" onClick={handleShow}>
        Add Student +
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='modal-xl modal-modern'
        
      >
        <Modal.Header closeButton className="modal-modern-header">
          <Modal.Title>Add Student Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-modern-body">
            <Row className="g-4">
                <Col sm={6}>
                <label className="upload-card">
                    <input type="file" className="upload-input" onChange={(e)=>setstudent({...Student,image:e.target.files[0]})}   />
                    <div className="upload-preview">
                      <img src= {preview?preview:"/images/upload.jpg"}  className='img-fluid' alt="" />
                    </div>
                    <span>Click to upload student photo</span>
                </label>
                </Col>
                <Col sm={6} className='d-flex flex-column justify-content-center'>
                <input type="text" className='form-control form-modern' onChange={(e)=>setstudent({...Student,first_name:e.target.value})} placeholder='Enter first name' />
                <input type="text" className='form-control form-modern' onChange={(e)=>setstudent({...Student,last_name:e.target.value})} placeholder='Enter Last name' />
                <input type="text" className='form-control form-modern' onChange={(e)=>setstudent({...Student,batch:e.target.value})} placeholder='Enter Batch' />
                <input type="text" className='form-control form-modern' onChange={(e)=>setstudent({...Student,phone:e.target.value})} placeholder='Enter Phonenumber' />
                </Col>

            </Row>
          
        </Modal.Body>
        <Modal.Footer className="modal-modern-footer">
          <Button variant="light" className="btn-ghost" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" className="btn-brand" onClick={handleAddstudent}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add
