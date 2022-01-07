import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import Spinner from './components/spinner/Spinner';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import EntireApp from './pages/entire-app/EntireApp';
import PageNotFound from './pages/page-not-found/PageNotFound';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Profiles from './pages/profiles/Profiles';

import { GlobalStyles } from './GlobalStyles';

import { loginUserByToken } from './store/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAdmin, loading, usersLoaded } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) dispatch(loginUserByToken());
  }, [dispatch]);

  return (
    <Fragment>
      <GlobalStyles />
      {loading ? (
        <Spinner size="7rem" big />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="sign-in" />} />
          <Route
            path="sign-in"
            element={usersLoaded ? <Navigate to="/profiles" /> : <SignIn />}
          />
          <Route
            path="sign-up"
            element={usersLoaded ? <Navigate to="/profiles" /> : <SignUp />}
          />

          {usersLoaded && (
            <Route path="/" element={<EntireApp />}>
              {isAdmin && (
                <Fragment>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="users/:userId" element={<Profiles />} />
                </Fragment>
              )}
              <Route path="profiles" element={<Profiles />} />
            </Route>
          )}
          <Route
            path="*"
            element={usersLoaded ? <PageNotFound /> : <Navigate to="sign-in" />}
          />
        </Routes>
      )}
    </Fragment>
  );
};

export default App;
