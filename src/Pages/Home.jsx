import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Vortex } from 'react-loader-spinner';
import { fetchingProducts,status} from '../Redux/ProductSlice';
import { Link } from 'react-router-dom';
import { add_to_cart } from '../Redux/CartSlice';
import {toast} from 'react-toastify'
import { check_cart } from '../Redux/CartSlice';
const Home = () => {
  const dispatch = useDispatch();
  const { loading, products_data } = useSelector(state => state?.allProducts);
  const {cart_items}=useSelector(state=>state?.cartProducts);
  useEffect(()=>{
      //Async Operation....
      dispatch(fetchingProducts());
      dispatch(check_cart());
  },[dispatch]);
  if(loading===status?.error)
  {
      return <div className='text-center' style={{marginTop: '100px', marginButtom: '100px'}}>
          <h2 className='text-denger'>Something Went Wrong in API....</h2>
      </div>
  }
  return (
    <>
      <div className='container-fluid' style={{marginTop:'10px',marginButtom:'50px'}}>
        <div className='row'>
          {
            (products_data?.length === 0) ? <>
              <div className='col-12 text-center' style={{ marginTop: '100px', marginButtom: '100px' }}>
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
            </> : <>
              {
                products_data?.map(item => {
                  return (<>
                    <div className='col-md-3' key={item?.id} style={{marginTop:'20px', marginButtom:'20px'}}>
                      <div className="card" style={{ width: '18rem',height:'520px',boxShadow:'20px 20px 50px' }}>
                        <img src={item?.images[0]} className="card-img-top img-fluid" alt={'...'}/>
                        <div className="card-body">
                          <h5 className="card-title">{item?.title}</h5>
                          <p className="card-text">{item?.description.slice(0,50)}</p>
                          <h5>Price: $ {item?.price}</h5>
                          <button className='btn btn-success' style={{marginRight:'20px'}} onClick={()=>{
                            dispatch(add_to_cart(item));
                            toast.success(`${cart_items?.length+1} items are added to cart!!!`,{
                              theme:'colored'
                            });
                          }}>Add to Cart</button>
                          <Link href="#!" className="btn btn-primary" to={`/moreProduct/${item?.id}`}>View More</Link><br/>
                        </div>
                      </div>
                    </div>
                  </>)
                })
              }
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Home