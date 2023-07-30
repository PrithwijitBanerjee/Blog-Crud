import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clear_comments, fetchComments, status } from '../../../Redux/CommentSlice';
import { MutatingDots } from 'react-loader-spinner';
const BlogComments = ({ id }) => {
    const dispatch = useDispatch();
    const { loading, comments } = useSelector(state => state?.commentsData);
    useEffect(() => {
        //Async Operation...
        dispatch(fetchComments(id));

        return () => { //clean Up Functions...
            dispatch(clear_comments());
        }
    }, [dispatch]);

    if (loading === status?.error) {
        return <div className='text-center text-danger' style={{ margin: '200px 200px' }}>
            <h3>Something went wrong with API...</h3>
        </div>
    }
    return (
        <>
            {
                (comments?.length === 0) ? <>
                    <div className='text-center'>
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
                    <h4 class="comments-count">Comments ({comments?.length})</h4><hr />
                    {
                        comments?.map((item, key) => {
                            return (
                                <>
                                    <div id={`comment-${key + 1}`} className="comment clearfix" key={key + 1}>
                                        <h5>{item.name}</h5>
                                        <time datetime="2020-01-01">Created At: {new Date(item.createdAt).toLocaleDateString()}</time>
                                        <time datetime="2020-01-01">Updated At: {new Date(item.updatedAt).toLocaleDateString()}</time>
                                        <p>{item.comment}</p>
                                    </div>
                                </>
                            )
                        })
                    }
                </>
            }
        </>
    )
}

export default BlogComments