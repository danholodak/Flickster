import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SplashPage from './components/SplashPage';
import SignUpFormPage from './components/SignUpFormPage';
import AccountPage from './components/AccountPage';
import ProfEditForm from './components/ProfEditForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import DeleteAccountPage from './components/DeleteAccountPage';

function App() {
  return (
    <>
      <Switch>
        <Route path='/account'>
          <AccountPage />
        </Route>
        <Route path='/change-password'>
          <ChangePasswordForm />
        </Route>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/sign-up'>
          <SignUpFormPage />
        </Route>
        <Route path='/profile_edit'>
          <ProfEditForm />
        </Route>
        <Route path='/delete_account'>
          <DeleteAccountPage />
        </Route>
        <Route path='/'>
          <SplashPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
