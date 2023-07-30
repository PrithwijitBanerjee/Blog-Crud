import React from 'react'
import BlogBreadCumb from '../Components/Cores/CoreBlog/BlogBreadCumb';
import BlogSidebar from '../Components/Cores/CoreBlog/BlogSidebar';
import BlogArticles from '../Components/Cores/CoreBlog/BlogArticles';
const Blog = () => {
  
  return (
    <>
      <BlogBreadCumb text={'Blog'}/>
      <main id="main">
        {/* ======= Blog Section ======= */}
        <section id="blog" className="blog">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 entries">
                <BlogArticles/>
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

export default Blog