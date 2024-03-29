import React from 'react'
import { Container } from '@material-ui/core'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <GoogleOAuthProvider clientId="209634924189-4u6b1pvvl1mqpkh10f4sc5qlmf389qq1.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route
              path="/auth"
              exact
              component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
