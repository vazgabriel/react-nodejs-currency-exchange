import React, { Suspense } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import './Layout.scss';

const year = new Date().getFullYear();

interface Props {
  ignoreContainer?: boolean;
}

const Layout: React.FC<Props> = ({ children, ignoreContainer }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className='BasePage'>
      <header>
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <img
            src={logo}
            alt='Logo'
            className='my-3'
            style={{ maxWidth: 120, maxHeight: 120, borderRadius: '100%' }}
          />
          <div className='row justify-content-around align-items-center links'>
            <Link to='/'>{t('Home')}</Link>
            <Link to='/about'>{t('About')}</Link>
            <Link to='/contact'>{t('Contact Us')}</Link>
            <Dropdown>
              <Dropdown.Toggle id='dropdown-basic'>
                {t('Language')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => i18n.changeLanguage('en')}>
                  English
                </Dropdown.Item>
                <Dropdown.Item onClick={() => i18n.changeLanguage('es')}>
                  Español
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>
      <main className={ignoreContainer ? '' : 'container'}>{children}</main>
      <footer className='d-flex justify-content-center align-items-center'>
        &copy; {year} - MoneyXchange
      </footer>
    </div>
  );
};

const LayoutSuspense: React.FC<Props> = props => (
  <Suspense
    fallback={
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ width: '100vw', height: '100vh' }}
      >
        <Spinner animation='border' />
      </div>
    }
  >
    <Layout {...props} />
  </Suspense>
);

export default LayoutSuspense;
