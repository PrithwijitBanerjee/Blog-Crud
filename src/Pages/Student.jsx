import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStudents,deleteStudent,clear_student_data} from '../Redux/StudentSlice';
import { Vortex } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import {check_cart} from '../Redux/CartSlice'
const Student = () => {
  const dispatch = useDispatch();
  const { loading, student_data } = useSelector(state => state?.students);

  const fetchingStudents = async () => {
    //Async Operations...
    dispatch(fetchStudents());
  }
  useEffect(() => {
    fetchingStudents();
    dispatch(check_cart());
    return ()=>{ //Clean Up function... similar component willUnmount in class component.
      dispatch(clear_student_data());
    }
  }, [dispatch]);

  if (loading === true) {
    return <div className='text-center' style={{marginTop:'200px', marginButtom:'200px'}}>
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </div>
  }
  const handleDelete=async (id)=>{
      const res=await deleteStudent(id);
      toast.error(res?.msg,{
        theme:'colored'
      });

      //For Refreshing Student Table....
      dispatch(fetchStudents());
  }
  return (
    <>
      <h2 className='text-center' style={{margin:'20px',color:'#ff6666'}}>Add Student: <Link to='/addStudent' style={{textDecoration:'none'}}>Add</Link></h2>
      <table className="table" style={{width:'70%', margin:'70px auto'}}>
        <thead style={{backgroundColor:'#ff6666',color:'white',fontWeight:'bolder'}}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email Id</th>
            <th scope="col">Phone</th>
            <th scope="col">City</th>
            <th scope="col">Address</th>
            <th scope="col">Class</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            (student_data?.length === 0) ? <>
              <tr>
                <td colSpan={8} className='text-center'><h3 className='text-danger'>No Record Found</h3></td>
              </tr>
            </> : <>
              {
                student_data?.map((item, index) => {
                  return (<>
                    <tr>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.phone}</td>
                      <td>{item?.city}</td>
                      <td>{item?.address}</td>
                      <td>{item?.class}</td>
                      <td><button className='btn btn-outline-success'><Link style={{textDecoration:'none'}} className='linkStyle' to={`/edit/${item?._id}`}>Edit</Link></button></td>
                      <td><button className='btn btn-outline-danger' onClick={()=>handleDelete(item?._id)}>Delete</button></td>
                    </tr>
                  </>)
                })
              }
            </>
          }
        </tbody>
      </table>

    </>
  )
}

export default Student