import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Index from './pages/Index/Index';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path='/' exact component={Index} />
        <Route path='/about' exact component={About} />
        <Route path='/contact' exact component={Contact} />
        <Route render={() => <Redirect to={'/'} />} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
