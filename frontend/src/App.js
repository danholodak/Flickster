import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SplashPage from './components/SplashPage';
import SignUpFormPage from './components/SignUpFormPage';

function App() {
  return (
    <>
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/sign-up'>
          <SignUpFormPage />
        </Route>
        <Route path='/'>
          <SplashPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
