import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { check_cart } from '../Redux/CartSlice'
const About = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(check_cart());
  }, []);
  return (
    <>
      <h3>About</h3>
    </>
  )
}

export default About