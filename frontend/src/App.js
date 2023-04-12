import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SplashPage from './components/SplashPage';
import SignUpFormPage from './components/SignUpFormPage';
import AccountPage from './components/AccountPage';
import ProfEditForm from './components/ProfEditForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import DeleteAccountPage from './components/DeleteAccountPage';
import AlbumsPage from './components/AlbumsPage';
import FavesPage from './components/FavesPage';
import PhotostreamPage from './components/Photostream';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <>
      <Switch>
        <Route path='/photos/:userId/albums'>
          <AlbumsPage />
        </Route>
        <Route path='/photos/:userId/favorites'>
          <FavesPage />
        </Route>
        <Route path='/photos/:userId'>
          <PhotostreamPage />
        </Route>
        <Route path='/people/:userId'>
          <AboutPage />
        </Route>
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
