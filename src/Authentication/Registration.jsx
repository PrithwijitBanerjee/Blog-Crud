import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister, clearLog } from '../Redux/RegistrationSlice';
import { InfinitySpin } from 'react-loader-spinner';
const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, redirectReg } = useSelector(state => state?.registration);

  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [error, setError] = useState({});

  //On Submit validation...
  const validation = () => {
    const err = {};
    if (user?.name === '') {
      err.name = 'Name is required';
    }
    if (user?.email === '') {
      err.email = 'Email is required';

    }
    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)) {
      err.email = 'Email is not valid';
    }
    if (user?.mobile?.length === 0) {
      err.mobile = 'Mobile No is required';
    }
    if (user?.password?.length === 0) {
      err.password = 'Password is required';
    }
    return err;
  }

  //On Change Validation.....

  const postUserData = e => {
    let name = e.target.name;
    let value = e.target.value;
    setUser(prevData => {
      return { ...prevData, [name]: value }
    });

    if (name === 'name') {
      if (value.length === 0) {
        setError({ ...error, name: '@Name is required' });
        setUser({ ...user, name: '' });
      }
      else {
        setError({ ...error, name: '' });
        setUser({ ...user, name: value });
      }
    }
    if (name === 'email') {
      if (value.length === 0) {
        setError({ ...error, email: '@Email Id is required' });
        setUser({ ...user, email: '' });
      }
      else {
        setError({ ...error, email: '' });
        setUser({ ...user, email: value });
      }
    }
    if (name === 'mobile') {
      if (value.length === 0) {
        setError({ ...error, mobile: '@Mobile No is required' });
        setUser({ ...user, mobile: '' });
      }
      else {
        setError({ ...error, mobile: '' });
        setUser({ ...user, mobile: value });
      }
    }
    if (name === 'password') {
      if (value.length === 0) {
        setError({ ...error, password: '@Password is required' });
        setUser({ ...user, password: '' });
      }
      else {
        setError({ ...error, password: '' });
        setUser({ ...user, password: value });
      }
    }
  }

  const submitInfo = async e => {
    e.preventDefault();
    const errorList = validation();
    setError(errorList);
    if (Object.keys(errorList)?.length < 1) {
      //Async Operation .....
      dispatch(userRegister(user));
    }

  }

  const redirectUser = () => {
    const name = localStorage.getItem('name');
    if (name !== '' && name !== undefined && name !== null) {
      navigate('/login');
    }
  }

  useEffect(() => {
    redirectUser();
  }, [redirectReg]);

  const log = () => {
    dispatch(clearLog());
  }
  return (
    <>
      <div className="card" style={{ width: '30rem', margin: '50px auto', padding: '10px',borderRadius:'20px', boxShadow:'20px 20px 50px' }}>
        <div className="card-body">
          <h4 className="card-title text-primary">Registration Form</h4>
          <p className="card-text">
            <form>
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label htmlFor="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user?.name} onChange={postUserData} placeholder='Your Name' autoComplete='on' required name='name' />
                <span className='text-danger'>{error?.name}</span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user?.email} onChange={postUserData} placeholder='Your Email Id' autoComplete='on' required name='email' />
                <span className='text-danger'>{error?.email}</span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Mobile</label>
                <input type="tel" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user?.mobile} onChange={postUserData} placeholder='Your Contact No' autoComplete='on' required name='mobile' />
                <span className='text-danger'>{error?.mobile}</span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={user?.password} onChange={postUserData} placeholder='Your Password' autoComplete='on' required name='password' />
                <span className='text-danger'>{error?.password}</span>
              </div>
              {
                (loading === true) ? <>
                  <div className='text-center'>
                    <InfinitySpin
                      width='200'
                      color="#4fa94d"
                    />
                  </div>
                </> : <>
                  <div className='text-center'>
                    <button type="submit" className="btn btn-primary" onClick={submitInfo}>Register</button>
                  </div>
                  <div style={{ marginTop: '8px' }} className='text-center'>
                    ***Already have an account??? <Link to='/login' onClick={log}>Login</Link>
                  </div>
                </>
              }
            </form>
          </p>

        </div>
      </div>

    </>
  )
}

export default Registration