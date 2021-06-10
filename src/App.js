import React from 'react';
import Home from './components/Home'
import Login from './components/Login'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      auth: localStorage.getItem('auth'),
      accessToken: localStorage.getItem('accessToken'),
      clien: localStorage.getItem('client'),
      uid: localStorage.getItem('uid')
    }
  }

  render() {

    const auth = this.state.auth
    let component;
    if (auth !== null) {
      component = <Home/>
    } else {
      component = <Login/>
    }
    
    return (
      component
    )
  }
}
