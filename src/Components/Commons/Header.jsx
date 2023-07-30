import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../Redux/LoginSlice'
import { toast } from 'react-toastify'
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { logouttogle } = useSelector(state => state?.login);
    const { length } = useSelector(state => state?.cartProducts);
    const name = localStorage.getItem('name');
    const handleLogout = () => {
        toast.success(`${name} has successfully logged out!!!`, {
            theme: 'colored'
        });

        dispatch(logout());
        navigate('/login');
    }
    return (
        <>
            <div style={{marginTop:'90px'}}>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#ff4d96', fontWeight: 'bold' }}>
                    <div className='container'>
                        <a className="navbar-brand text-white" href="#!">Navbar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link active text-white" to='/'>Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active text-white" to='/about'>About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active text-white" to='/blog'>Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active text-white" to='/student'>Student</Link>
                                </li>
                                {
                                    (logouttogle === true) ? <>
                                        <li className="nav-item">
                                            <Link className="nav-link active text-white" to='/addToCart'>Cart ({length})</Link>
                                        </li>
                                        <li className="nav-item" style={{ marginRight: '20px' }}>
                                            <Link className="nav-link active bg-warning" style={{ border: 'none', color: 'white', fontWeight: 'bold' }}>Hi. {name.split(' ')[0]}</Link>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link active text-white" style={{ border: 'none', backgroundColor: 'inherit', color: 'white', fontWeight: 'bold' }} onClick={handleLogout}>Sign Out</button>
                                        </li>
                                    </> : <>
                                        <li className="nav-item">
                                            <Link className="nav-link active text-white" to='/login'>SignIn</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}

export default Header