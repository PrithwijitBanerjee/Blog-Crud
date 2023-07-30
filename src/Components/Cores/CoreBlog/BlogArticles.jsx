import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllBlogArticles, status, clear_blog_articles,paginate_articles} from '../../../Redux/BlogSlice'
import { MutatingDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { check_cart } from '../../../Redux/CartSlice';
import ReactPaginate from 'react-paginate';
const BlogArticles = () => {
    const [pages,setPages]=useState(0);
    const dispatch = useDispatch();
    const { loadingArt, articles,pageCount} = useSelector(state => state?.allBlog);
    const limit = 2;
    useEffect(() => {
        //Async Operation....
        dispatch(fetchAllBlogArticles());
        dispatch(check_cart());
        return () => { //Clean Up Function...
            dispatch(clear_blog_articles());
        }
    }, [dispatch]);
    useEffect(()=>{
            setPages(Math.ceil(pageCount/limit));
            dispatch(paginate_articles({currentPage:1,limit}));
    },[pageCount]);
    
    const handlePageChange=data=>{
        const currentPage=data?.selected+1;
        dispatch(paginate_articles({currentPage,limit}));
    }

    if (loadingArt === status?.error) {
        return <div className='text-center text-danger' style={{ margin: '200px 200px' }}>
            <h3>Something went wrong with API...</h3>
        </div>
    }
    return (
        <>
            {/* Start blog entry */}
            {
                (articles?.length === 0) ? <>
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
                    {
                        articles?.map(item => {
                            return (<>
                                <article className="entry" data-aos="fade-up" key={item?.id}>
                                    <div className="entry-img">
                                        <img src={`https://restapinodejs.onrender.com/api/blog/image/${item?._id}`} alt='...' className="img-fluid" />
                                    </div>
                                    <h2 className="entry-title">
                                        <a href="blog-single.html">{item?.title}</a>
                                    </h2>
                                    <div className="entry-meta">
                                        <ul>
                                            <li className="d-flex align-items-center"><i className="icofont-user"></i> <a href="blog-single.html">Admin</a></li>
                                            <li className="d-flex align-items-center"><i className="icofont-wall-clock"></i> <a href="blog-single.html"><time dateTime='2020-01-01'>{new Date(item?.createdAt).toLocaleDateString()}</time></a></li>
                                            <li className="d-flex align-items-center"><i className="icofont-comment"></i> <a href="blog-single.html">Comments</a></li>
                                        </ul>
                                    </div>
                                    <div className="entry-content">
                                        <p dangerouslySetInnerHTML={{
                                            __html: item?.postText.slice(0, 350)
                                        }}>
                                        </p>
                                        <div className="read-more">
                                            <Link href="blog-single.html" to={`/blogDetails/${item?._id}`}>Read More</Link>
                                        </div>
                                    </div>
                                </article>
                            </>)
                        })
                    }
                </>
            }
            {/* End blog entry */}

            {/* Blog Pagination Starts */}
            {/* <div className="blog-pagination">
                <ul className="justify-content-center">
                    <li className="disabled"><i className="icofont-rounded-left" /></li>
                    <li><a href="#!">1</a></li>
                    <li className="active"><a href="#!">2</a></li>
                    <li><a href="#!">3</a></li>
                    <li><a href="#!"><i className="icofont-rounded-right" /></a></li>
                </ul>
            </div> */}


            {/* Blog Pagination Starts */}
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                containerClassName='blog-pagination pagination justify-content-center'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                activeClassName='activePage'
                activeLinkClassName='activePage'
            onPageChange={handlePageChange}
            />
            {/*Blog Pagination Ends */}
        </>
    )
}

export default BlogArticles