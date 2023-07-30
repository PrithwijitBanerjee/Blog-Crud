import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/LoginSlice';
import { clearLog } from '../Redux/RegistrationSlice';
import { InfinitySpin } from 'react-loader-spinner'
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, redirectTo } = useSelector(state => state?.login);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = React.useState({});

  //On submit validation.....
  const validation = () => {
    const err = {};
    if (user?.email === '') {
      err.email = 'Email is required';

    }
    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)) {
      err.email = 'Email is not valid';
    }
    if (user?.password?.length === 0) {
      err.password = 'Password is required';
    }
    return err;
  }

  //On Change Validation....
  const postUserData = e => {
    let name = e.target.name;
    let value = e.target.value;
    setUser(prevData => {
      return { ...prevData, [name]: value }
    });
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
      //Async Operation...
      dispatch(loginUser(user));
    }
  }
  const redirectUser = () => {
    const token = localStorage.getItem('token');
    if (token !== '' && token !== null && token !== undefined) {
      navigate('/');
    }
  }

  useEffect(() => {
    redirectUser();
  }, [redirectTo]);


  const log = () => {
    dispatch(clearLog);
  }
  return (
    <>

      <div className="card" style={{ width: '25rem', margin: '60px auto', padding: '10px', borderRadius: '20px', boxShadow: '20px 20px 50px' }}>
        <div className="card-body">
          <h4 className="card-title text-primary">Login Form</h4>
          <p className="card-text">
            <form>
              <div className="form-group" style={{ marginTop: '25px', marginButtom: '20px' }}>
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={user?.email} onChange={postUserData} autoComplete='on' placeholder='Email Id'/>
                <span className='text-danger'>{error?.email}</span>
              </div>
              <div className="form-group" style={{marginButtom:'10px'}}>
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={user?.password} onChange={postUserData} autoComplete='on' placeholder='Password'/>
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
                    <button type="submit" className="btn btn-primary" onClick={submitInfo}>Login</button>
                  </div>
                </>
              }
              <div className='text-center' style={{marginTop:'7px'}}>
                New User? <Link to='/registration' onClick={log}>Register</Link>
              </div>
            </form>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login