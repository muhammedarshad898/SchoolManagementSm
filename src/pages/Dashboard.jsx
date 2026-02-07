import React, { useContext, useEffect, useState } from 'react'
import Add from '../components/Add';
import Table from 'react-bootstrap/Table';
import Edit from '../components/Edit';
import { getstudentapi,deletestudentapi} from '../services/Allapi';
import { responseContext } from '../contextapi/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Dashboard() {
  const[Students,setstudent]=useState([])
  const {response}=useContext(responseContext)
  const nav=useNavigate()
  useEffect(()=>{
    getdata()

  },[response])
  const getdata=async()=>{
    const header={
      'Content-Type':'application/json',
      'Authorization':`Token ${sessionStorage.getItem('token')}`
    }
    const res=await getstudentapi(header)
    console.log(res)
    if(res.status==200){
      setstudent(res.data)
    }
  }
  const handledelete=async(id)=>{
    const header={
      'Content-Type':'application/json',
      'Authorization':`Token ${sessionStorage.getItem('token')}`
      
    
    }
    const res=await deletestudentapi( id,header)
    console.log(res)
    if (res.status==200){
      getdata()
    }
    else{
      toast.warning("deletion failed")
    }
    


  }
  const logout=()=>{
    sessionStorage.clear()
    nav('/')
    toast.info("logged out successfully")

  }
  const totalStudents = Students.length
  const teacherName = sessionStorage.getItem('uname') || 'Teacher'
  return (
   <>
    <div className="page dashboard">
      <header className="dash-topbar">
        <div className="brand">
          <span className="brand-mark">SM</span>
          <div>
            <h3>School Management</h3>
            <span>Student Operations</span>
          </div>
        </div>
        <div className="dash-actions">
          <span className="teacher-pill">Hi, {teacherName}</span>
          <button className="btn-danger-alt" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="dash-shell">
        <div className="dash-actions-row">
          <Add />
        </div>

        <section className="data-card">
          <div className="data-header">
            <div>
              <h2>Student Roster</h2>
              <p>Manage every student detail in one place.</p>
            </div>
            <span className="count-pill">{totalStudents} students</span>
          </div>

          {Students.length>0 ? (
            <Table striped bordered hover responsive className='mt-3 table-modern'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Batch</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Students.map((item,index)=>(
                  <tr key={item._id}>
                    <td>{index+1}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.batch}</td>
                    <td>{item.phone}</td>
                    <td className="table-actions">
                      <Edit student={item} />
                      <button className='btn-outline danger' onClick={()=>handledelete(item._id)}>
                        <i className="fa-solid fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="empty-state">
              <h3>No students yet</h3>
              <p>Add your first student to start managing records.</p>
            </div>
          )}
        </section>
      </div>
    </div>
   </>
  )
}

export default Dashboard
