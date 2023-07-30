import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { status } from '../Redux/CartSlice';
import { Vortex } from 'react-loader-spinner';
import { remove_cart,check_cart,clear_cart} from '../Redux/CartSlice';
const AddToCart = () => {
    const dispatch = useDispatch();
    const { cart_items,loading} = useSelector(state => state?.cartProducts);
    useEffect(()=>{
        dispatch(check_cart());
    },[]);
    if (loading === status?.error) {
        return <div className='text-center' style={{ marginTop: '100px', marginButtom: '100px' }}>
            <h2 className='text-danger'>Something wrong with Api....</h2>
        </div>
    }
    if (loading === status?.loading) {
        return <div className='col-12 text-center' style={{ marginTop: '100px', marginButtom: '100px' }}>
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
    return (
        <>
                <div className='cartWrapper'>
                        {
                            (cart_items?.length===0)?<>
                                <div className='cartCard' style={{marginTop:'100px',marginButtom:'100px'}}>
                                        <h3>Empty card</h3>
                                </div>
                            </>:<>
                                {
                                    cart_items?.map((item)=>{
                                        return (<>
                                            <div className='col-12 cartCard' key={item?.id}>
                                                    <h3>Title: {item?.title}</h3>
                                                    <img src={item?.category?.image} alt='...' className='img-fluid' height='100px' width='100px'/>
                                                    <h5>Price: ${item?.price}</h5>
                                                    <button className='btn btn-outline-danger' onClick={()=>{
                                                        dispatch(remove_cart(item?.id));
                                                    }}>Remove</button>
                                            </div>
                                        </>)
                                    })
                                }
                            </>
                        }
                </div>
                <div className='text-center' style={{margin:'20px 20px'}}>
                        <button onClick={()=>{
                            dispatch(clear_cart());
                        }} className='btn btn-outline-warning'>Clear Cart</button>
                </div>
        </>
    )
}

export default AddToCart