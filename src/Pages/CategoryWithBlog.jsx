import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategoryWithBlog, clear_categoryWithBlog, status } from '../Redux/CategoryWithBlogSlice'
import { check_cart } from '../Redux/CartSlice'
import BlogBreadCumb from '../Components/Cores/CoreBlog/BlogBreadCumb'
import BlogSidebar from '../Components/Cores/CoreBlog/BlogSidebar'
import { MutatingDots } from 'react-loader-spinner';

const CategoryWithBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { category_blog_data, loading } = useSelector(state => state?.categoryWithBlog);

  useEffect(() => {
    //Async Operation...
    dispatch(fetchCategoryWithBlog(id));
    dispatch(check_cart());
    return () => { //clean Up Function...
      dispatch(clear_categoryWithBlog());
    }
  }, [dispatch]);

  if (loading === status?.error) {
    return <div className='text-center text-danger' style={{ margin: '200px 200px' }}>
      <h3>Something went wrong with API...</h3>
    </div>
  }
  return (
    <>
      <BlogBreadCumb text={'category/blog/post'} />
      <main id="main">
        {/* ======= Blog Section ======= */}
        <section id="blog" className="blog">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 entries">
                {
                  (category_blog_data?.length === 0) ? <>
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
                      category_blog_data?.map(item => {
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
                        </>);
                      })
                    }
                  </>
                }
              </div>{/* End blog entries list */}
              <div className="col-lg-4">
                <BlogSidebar />
              </div>{/* End blog sidebar */}
            </div>
          </div>
        </section>{/* End Blog Section */}
      </main>{/* End #main */}
    </>
  )
}

export default CategoryWithBlog