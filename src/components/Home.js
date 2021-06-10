import React from 'react';
import Orders from './Orders'
import Login from './Login'

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { auth: localStorage.getItem('auth') };
    this.handeLogout = this.handeLogout.bind(this);
    this.handleChangeAuth = this.handleChangeAuth.bind(this);
  }  

  handleChangeAuth(value) {
    this.setState({auth: value});
  }  

  handeLogout() {
    this.handleChangeAuth(null)
    localStorage.clear()
  }

  home() {
    let component;

    if (this.state.auth !== null) {
      component = <div className="home">
                    <div className="container-logout">          
                      <button onClick={this.handeLogout}>Salir</button>
                    </div>              
                    <Orders/>
                  </div>
    } else {
      component = <Login/>
    }
    
    return (
      component
    )    
  }

  render() {
    return (
      this.home()
    )
  }
}
