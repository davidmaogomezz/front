import React from 'react';
import Home from './Home'

import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'shipit@prueba.com', password: '12345678', auth: null };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeAuth = this.handleChangeAuth.bind(this);


    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleChangeAuth(value) {
    this.setState({auth: value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(`http://127.0.0.1:3000/api/v1/users/sign_in`, { user: { email: this.state.email, password: this.state.password} }, { headers: { 'Content-Type': 'application/json'}})
    if (response.status === 200) {
      const user = response.data.user;
      const headers = response.headers;    
      const accessToken = headers['access-token']
      const client = headers['client']
      const uid = headers['uid']
      localStorage.setItem('auth', true)
      this.handleChangeAuth(true)
      localStorage.setItem('email', user.email)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('client', client)
      localStorage.setItem('uid', uid)
    } else {
      alert('Datos incorrectos')
    }
  }

  formLogin() {
    const auth = this.state.auth
    let component;
    if (auth !== null) {
      component = <Home/>
    } else {
        component = <div className="container-login">
                      <div className="login">
                        <h5>Iniciar sesión</h5>
                        <form onSubmit={this.handleSubmit}>
                          <div className="item-form">
                            <label>
                              Email:              
                            </label>
                            <input type="email" name="email" value={this.state.email} onChange={this.handleChangeEmail} />
                          </div>
                          <div className="item-form">
                            <label>
                              Contraseña:              
                            </label>
                            <input type="password" name="email" value={this.state.password} onChange={this.handleChangePassword} />
                          </div>
                          <input type="submit" value="Submit" />
                        </form>          
                      </div>
                    </div>
    }
    
    return (
      component
    )    

  }

  render() {
    return (
      this.formLogin()
    )
    
  }
}
