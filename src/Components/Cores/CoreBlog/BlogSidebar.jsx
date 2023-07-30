import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllCategory, status } from '../../../Redux/CategorySlice'
import { Link } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner';
import { fetchRecentPosts, clear_recent_post, statusRecent } from '../../../Redux/RecentPostSlice';
import { check_cart } from '../../../Redux/CartSlice';
import SearchInputBlog from './SearchInputBlog';

const BlogSidebar = () => {
    const dispatch = useDispatch();
    const { loadingCat, all_category_data } = useSelector(state => state?.allCategory);
    const { loading, recent_post_data } = useSelector(state => state?.recentPosts);
    useEffect(() => {
        //Async Operation....
        dispatch(fetchAllCategory());
        dispatch(fetchRecentPosts());
        dispatch(check_cart);

        return () => { //clean Up Function...
            dispatch(clear_recent_post);
        }
    }, [dispatch]);


    if (loadingCat === status?.error) {
        return <div className='text-danger text-center' style={{ margin: '200px 200px' }}>
            <h3>Something went wrong with API...</h3>
        </div>
    }

    if (loading === statusRecent?.error) {
        return <div className='text-danger text-center' style={{ margin: '200px 200px' }}>
            <h3>Something went wrong with API...</h3>
        </div>
    }
    return (
        <>
            <div className="sidebar" data-aos="fade-left">
                <h3 className="sidebar-title">Search</h3>
                    <SearchInputBlog/>
                <h3 className="sidebar-title">Categories</h3>
                <div className="sidebar-item categories">
                    <ul>
                        {
                            (loadingCat === status?.loading) ? <>
                                <MutatingDots
                                    height="100"
                                    width="100"
                                    color="#4fa94d"
                                    secondaryColor='#4fa94d'
                                    radius='12.5'
                                    ariaLabel="mutating-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </> : <>
                                {
                                    all_category_data?.map(item => {
                                        return (<>
                                            <li key={item?.id}><Link to={`/categoryWithBlog/${item?._id}`}>{item?.category} <span>(25)</span></Link></li>
                                        </>)
                                    })
                                }
                            </>
                        }
                    </ul>
                </div>{/* End sidebar categories*/}
                <h3 className="sidebar-title">Recent Posts</h3>
                <div className="sidebar-item recent-posts">

                    {
                        (recent_post_data?.length === 0) ? <>
                            <MutatingDots
                                height="100"
                                width="100"
                                color="#4fa94d"
                                secondaryColor='#4fa94d'
                                radius='12.5'
                                ariaLabel="mutating-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </> : <>
                            {
                                recent_post_data?.map(post => {
                                    return (<>
                                        <div className="post-item clearfix" key={post?.id}>
                                            <img src={`https://restapinodejs.onrender.com/api/blog/image/${post?._id}`} alt='...' />
                                            <h4><Link to=''>{post?.title}</Link></h4>
                                            <time dateTime="2020-01-01">{new Date(post?.createdAt).toLocaleDateString('en-us', { month: 'short', year: 'numeric' })}</time>
                                        </div>
                                    </>)
                                })
                            }
                        </>
                    }

                </div>{/* End sidebar recent posts*/}
                <h3 className="sidebar-title">Tags</h3>
                <div className="sidebar-item tags">
                    <ul>
                        <li><a href="#!">App</a></li>
                        <li><a href="#!">IT</a></li>
                        <li><a href="#!">Business</a></li>
                        <li><a href="#!">Business</a></li>
                        <li><a href="#!">Mac</a></li>
                        <li><a href="#!">Design</a></li>
                        <li><a href="#!">Office</a></li>
                        <li><a href="#!">Creative</a></li>
                        <li><a href="#!">Studio</a></li>
                        <li><a href="#!">Smart</a></li>
                        <li><a href="#!">Tips</a></li>
                        <li><a href="#!">Marketing</a></li>
                    </ul>
                </div>{/* End sidebar tags*/}
            </div>{/* End sidebar */}
        </>
    )
}

export default BlogSidebar