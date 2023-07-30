import React, { useEffect } from 'react'
import BlogBreadCumb from '../Components/Cores/CoreBlog/BlogBreadCumb'
import BlogSidebar from '../Components/Cores/CoreBlog/BlogSidebar'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogDetails, clear_blog_details, status } from '../Redux/BlogDetailSlice'
import { MutatingDots } from 'react-loader-spinner';
import { check_cart } from '../Redux/CartSlice'
// import BlogComments from '../Components/Cores/CoreBlog/BlogComments'
const BlogDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, blogDetail_data } = useSelector(state => state?.blogDetails);

    useEffect(() => {
        //Async Operation....

        dispatch(fetchBlogDetails(id));
        dispatch(check_cart());

        return () => {//clean Up Function....
            dispatch(clear_blog_details());
        }
    },[dispatch]);

    if (loading === status?.error) {
        return <div className='text-center text-danger' style={{ margin: '200px 200px' }}>
            <h3>Something went wrong with API...</h3>
        </div>
    }
    return (
        <>
            <BlogBreadCumb text={'blogDetails'} />
            <main id="main">
                {/* ======= Blog Section ======= */}
                <section id="blog" className="blog">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 entries">
                                {
                                    (Object.keys(blogDetail_data)?.length === 0) ? <>
                                        <div style={{ margin: '200px auto', width: '100px' }}>
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
                                        </div>
                                    </> : <>
                                        <article className="entry" data-aos="fade-up">
                                            <div className="entry-img">
                                                <img src={`https://restapinodejs.onrender.com/api/blog/image/${blogDetail_data?._id}`} alt='...' className="img-fluid" />
                                            </div>
                                            <h2 className="entry-title">
                                                <a href="blog-single.html">{blogDetail_data?.title}</a>
                                            </h2>
                                            <div className="entry-meta">
                                                <ul>
                                                    <li className="d-flex align-items-center"><i className="icofont-user"></i> <a href="blog-single.html">Admin</a></li>
                                                    <li className="d-flex align-items-center"><i className="icofont-wall-clock"></i> <a href="blog-single.html"><time dateTime='2020-01-01'>{new Date(blogDetail_data?.createdAt).toLocaleDateString()}</time></a></li>
                                                    <li className="d-flex align-items-center"><i className="icofont-comment"></i> <a href="blog-single.html">Comments</a></li>
                                                </ul>
                                            </div>
                                            <div className="entry-content">
                                                <p dangerouslySetInnerHTML={{
                                                    __html: blogDetail_data?.postText
                                                }}>
                                                </p>
                                            </div>
                                        </article>
                                        {/* <BlogComments id={blogDetail_data?._id}/> */}
                                    </>
                                }
                            </div>{/* End blog entries list */}
                            <div className="col-lg-4">
                                <BlogSidebar/>
                            </div>{/* End blog sidebar */}
                        </div>
                    </div>
                </section>{/* End Blog Section */}
            </main>{/* End #main */}
        </>
    )
}

export default BlogDetails