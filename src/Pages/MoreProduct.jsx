import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchSingleProduct, clear_single_product, status } from '../Redux/MoreProductSlice';
import { Vortex } from 'react-loader-spinner';
import { check_cart } from '../Redux/CartSlice';
const MoreProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, single_product_data } = useSelector(state => state?.singleProduct);
    useEffect(() => {
        //Async Operation...
        dispatch(fetchSingleProduct(id));
        dispatch(check_cart());
        //clean Up functions...
        return () => {
            dispatch(clear_single_product());
        }
    }, [dispatch]);

    if (loading === status?.error) {
        return <div className='text-center' style={{ marginTop: '100px', marginButtom: '100px' }}>
            <h2 className='text-denger'>Something Went Wrong in API....</h2>
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
            <div className='container-fluid'>
                <div className='row'>

                    <div className="card" style={{ width: '30rem',margin:'50px auto',boxShadow:'20px 20px 50px' }}>
                        <img src={single_product_data?.category?.image} className="card-img-top img-fluid" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{single_product_data?.title}</h5>
                            <p className="card-text">{single_product_data?.description}</p>
                            <p>Created At: {single_product_data?.creationAt}</p>
                            <p>Updated At: {single_product_data?.updatedAt}</p>
                            <p>Price: {single_product_data?.price}</p>
                            <button className='btn btn-outline-primary'>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MoreProduct