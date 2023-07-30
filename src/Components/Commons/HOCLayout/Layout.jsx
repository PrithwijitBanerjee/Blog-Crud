import Footer from "../Footer";
import Header from "../Header";
import { Helmet } from "react-helmet";

const Layout = (Component) => (({ description,keywords,author,title,...props}) => {
    return (<>
        <Helmet>
            <meta charset="UTF-8" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <title>{title}</title>
        </Helmet>

        <Header />
        <Component {...props} />
        <Footer />
    </>)
});


export default Layout;