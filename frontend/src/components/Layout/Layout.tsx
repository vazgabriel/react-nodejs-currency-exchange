import React from 'react';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import './Layout.scss';

const year = new Date().getFullYear();

const Layout: React.FC = ({ children }) => (
  <div className='BasePage'>
    <header>
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <img
          src={logo}
          alt='Logo'
          className='my-3'
          style={{ maxWidth: 120, maxHeight: 120, borderRadius: '100%' }}
        />
        <div className='d-flex links'>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact Us</Link>
        </div>
      </div>
    </header>
    <main className='container'>{children}</main>
    <footer className='d-flex justify-content-center align-items-center'>
      &copy; {year} - MoneyXchange
    </footer>
  </div>
);

export default Layout;
