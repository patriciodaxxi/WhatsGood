import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import SearchGames from './pages/SearchGames';
import SavedGames from './pages/SavedGames';
import SavedMedia from './pages/SavedMedia';
import SearchMusic from './pages/SearchMusic';
import SavedMusic from './pages/SavedMusic';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import SearchUser from './pages/SearchUser';
import SavedFriends from './pages/SavedFriends';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Messages from './pages/Messages';
import ProfilePage from './pages/Profile';
import FriendProfile from './pages/FriendProfile';


import * as API from './utils/API';
import AuthService from './utils/auth';

// import our context object for state
import UserInfoContext from './utils/UserInfoContext';

function App() {
  // create theme mode state for app
  const [darkMode, setDarkMode] = useState(getInitialMode());

  // set data to be used for UserInfoContext and make it available to all other components
  const [userInfo, setUserInfo] = useState({
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    bio: '',
    savedBooks: [],
    savedMusic: [],
    savedMovies: [],
    savedGames: [],
    savedLikes: [],
    bookCount: 0,
    musicCount: 0,
    movieCount: 0,
    gameCount: 0,
    friends: [],
    notifications: [],
    chats: [],

    // method to get user data after logging in
    getUserData: () => {
      // if user's logged in get the token or return null
      const token = AuthService.loggedIn() ? AuthService.getToken() : null;

      if (!token) {
        return false;
      }
      API.getMe(token)


        .then(({ data: { _id, username, firstName, lastName, email, picture, bio, savedBooks, savedMusic, savedMovies, savedGames, savedLikes, bookCount, musicCount, movieCount, gameCount, friends, notifications, chats } }) =>
          setUserInfo({ ...userInfo, _id, username, firstName, lastName, email, picture, bio, savedBooks, savedMusic, savedMovies, savedGames, savedLikes, bookCount, musicCount, movieCount, gameCount, friends, notifications, chats })
        )
        .catch((err) => console.log(err));
    }
  });

  // on load, get user data if a token exists
  useEffect(() => {
    userInfo.getUserData();
  }, []);

  // store mode preference on change
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPrefersDark = getPrefColorScheme();
    // if mode was saved --> dark / light
    if (isReturningUser) {
      return savedMode;
      // if preferred color scheme is dark --> dark
    } else if (userPrefersDark) {
      return true;
      // otherwise --> light
    } else {
      return false;
    }
    // return savedMode || false;
  }

  function getPrefColorScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return (
    <Router>
      <>
        {/* wrap our entire app in context provider and provide userInfo state as value */}
        <UserInfoContext.Provider value={userInfo}>
          <div className={darkMode ? "dark-mode" : "light-mode"}>
            <Navbar>
            <button onClick={(e) => {
              e.preventDefault();
              setDarkMode(prevMode => !prevMode)}
              }>
              { darkMode
                ? "Light Mode"
                : "Dark Mode"
              }
            </button>
            </Navbar>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/profile' component={ProfilePage} />
              <Route exact path='/friend_profile' component={FriendProfile} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/search_books' component={SearchBooks} />
              <Route exact path='/saved_books' component={SavedBooks} />
              <Route exact path='/search_music' component={SearchMusic} />
              <Route exact path='/saved_music' component={SavedMusic} />
              <Route exact path='/search_movies' component={SearchMovies} />
              <Route exact path='/saved_movies' component={SavedMovies} />
              <Route exact path='/saved_media' component={SavedMedia} />
              <Route exact path='/search_user' component={SearchUser} />
              <Route exact path='/saved_friends' component={SavedFriends} />
              <Route exact path='/search_games' component={SearchGames} />
              <Route exact path='/saved_games' component={SavedGames} />
              <Route exact path='/messages' component={Messages} />
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
            </Switch>
          </div>
        </UserInfoContext.Provider>
      </>
    </Router>
  );
}

export default App;
