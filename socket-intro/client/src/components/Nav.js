import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {userContext} from '../context/userContext';

const Nav = (props) => {
    const navigate = useNavigate();
    const {loggedInUser, setLoggedInUser} = useContext(userContext);

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) => {
                console.log(res);
                window.localStorage.removeItem('uuid')
                setLoggedInUser({})
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            <Link to={'/homepage'}>Home</Link>
            <button className='btn btn-danger ms-5' onClick={logout}>Logout</button>
        </div>
)}

export default Nav;