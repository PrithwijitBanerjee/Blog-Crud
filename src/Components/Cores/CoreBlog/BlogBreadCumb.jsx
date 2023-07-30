import React from 'react'
import { Link } from 'react-router-dom'

const BlogBreadCumb = ({text}) => {
    return (
        <>
            {/* ======= Breadcrumbs ======= */}
            <section id="breadcrumbs" className="breadcrumbs">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Blog</h2>
                        <ol>
                            <li><Link to='/'>Home</Link></li>
                            <li>{text}</li>
                        </ol>
                    </div>
                </div>
            </section>{/* End Breadcrumbs */}

        </>
    )
}

export default BlogBreadCumb