import React, { useEffect } from 'react'
import { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col,Row } from 'react-bootstrap';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import { updatestudentapi } from '../services/Allapi';
import { responseContext } from '../contextapi/ContextProvider';

function Edit({student}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [preview,setpreview]=useState("")
  const{setresponse}=useContext(responseContext)
  const[data,setdata]=useState({
    first_name:"",last_name:"",batch:"",phone:"",image:""
  })
  useEffect(()=>{
    setdata({...student})
    

  },[])
  useEffect(()=>{
    if(data.image.type){
      setpreview(URL.createObjectURL(data.image))
    }
    else{
      setpreview("")
    }

  },[data.image])
  console.log(data)
  const handleedit=async()=>{
    console.log(data)
    const{first_name,last_name,phone,batch,image}=data
    if(!first_name||!last_name||!phone||!batch||!image){
      toast.warning("enter a valid input")
    }
    else{
      if(data.image.type){
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
      const res=await updatestudentapi(student._id,header,fd)
      console.log(res)
      if(res.status==200){
        toast.success("student details Updated")
        handleClose()
        setresponse(res)
        
        
      }
      else{
        toast.error("something went wrong")
      }
      }
      else{
        const header={
          'Content-Type':"application/json",
          'Authorization':`Token ${sessionStorage.getItem('token')}`
        }
        const res=await updatestudentapi(student._id,header,data)
      console.log(res)
      if(res.status==200){
        toast.success("student details Updated")
        handleClose()
        setresponse(res)
      }
      else{
        toast.error("something went wrong")
      }
  

      }
      
    }
  }
   
   
  return (
   <>
   <Button variant="light" className="btn-outline" onClick={handleShow}>
      <i className="fa-solid fa-pen-to-square" />
    </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='modal-xl modal-modern'
      >
        <Modal.Header closeButton className="modal-modern-header">
          <Modal.Title>Edit Student Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-modern-body">
            <Row className="g-4">
                <Col sm={6}>
                <label className="upload-card">
                    <input type="file" className="upload-input" onChange={(e)=>setdata({...data,image:e.target.files[0]})} />
                    <div className="upload-preview">
                      <img src={ preview?preview:`${base_url}/uploads/${data.image}`} className='img-fluid' alt="" />
                    </div>
                    <span>Click to update student photo</span>
                </label>
                </Col>
                <Col sm={6} className='d-flex flex-column justify-content-center'>
                <input type="text" defaultValue={data.first_name} onChange={(e)=>setdata({...data,first_name:e.target.value})} className='form-control form-modern' placeholder='Enter first name' />
                <input type="text" defaultValue={data.last_name}  onChange={(e)=>setdata({...data,last_name:e.target.value})}  className='form-control form-modern' placeholder='Enter Last name' />
                <input type="text" defaultValue={data.batch} onChange={(e)=>setdata({...data,batch:e.target.value})}   className='form-control form-modern' placeholder='Enter Batch' />
                <input type="text" defaultValue={data.phone} onChange={(e)=>setdata({...data,phone:e.target.value})}  className='form-control form-modern' placeholder='Enter Phonenumber' />
                </Col>

            </Row>
          
        </Modal.Body>
        <Modal.Footer className="modal-modern-footer">
          <Button variant="light" className="btn-ghost" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" className="btn-brand" onClick={handleedit}>Save</Button>
        </Modal.Footer>
      </Modal>
   </>
  )

  }

export default Edit
