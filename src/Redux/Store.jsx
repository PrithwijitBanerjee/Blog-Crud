import {configureStore} from '@reduxjs/toolkit'
import RegistrationSlice from './RegistrationSlice';
import LoginSlice from './LoginSlice';
import StudentSlice from './StudentSlice';
import ProductSlice from './ProductSlice';
import MoreProductSlice from './MoreProductSlice';
import CartSlice from './CartSlice';
import CategorySlice from './CategorySlice';
import CategoryWithBlogSlice from './CategoryWithBlogSlice';
import BlogSlice from './BlogSlice';
import BlogDetailSlice from './BlogDetailSlice';
import RecentPostSlice from './RecentPostSlice';
import CommentSlice from './CommentSlice';


export const myStore=configureStore({
    reducer:{
        registration:RegistrationSlice.reducer,
        login:LoginSlice.reducer,
        students:StudentSlice.reducer,
        allProducts:ProductSlice.reducer,
        singleProduct:MoreProductSlice.reducer,
        cartProducts:CartSlice,
        allBlog:BlogSlice.reducer,
        allCategory:CategorySlice.reducer,
        categoryWithBlog:CategoryWithBlogSlice.reducer,
        blogDetails:BlogDetailSlice.reducer,
        recentPosts:RecentPostSlice.reducer,
        commentsData:CommentSlice.reducer,
    }
});