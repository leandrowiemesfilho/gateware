import React from 'react';
import './App.css';


class App extends React.Component {
    constructor(props){ 
      super(props); 
      this.state = { 
        username: '',
        name: '',
        git_url: '',
        followers: '',
        following: '',
        url: '',
        repos: []
      };
    }

    getUser(username) {
      return fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(response => {
        return response;
      })
    }

    getUserRepo(username) {
      return fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(response => {
        return response;
      })
   }

    async handleSubmit(e) {
      e.preventDefault();
      
      let user = await this.getUser(this.refs.username.value);
      this.state.repos = await this.getUserRepo(this.refs.username.value);
      this.setState({ 
        avatar_url: user.avatar_url,
        username: user.login,
        followers: user.followers,
        following: user.following,
        url: user.url
      });
      
    }

    render() {
      let user;
      let repo = [];
      if(this.state.username) {
        user = 
          <div>
            <h1>Dados do Usuário</h1>
            <p>Username: {this.state.username}</p> 
            <p>{this.state.followers} seguidor(es)</p>
            <p>Seguindo {this.state.following} usuário(s)</p>
            <hr/>
            <hr/>
          </div>

        this.state.repos.forEach((reposito, repositoId) => {
          repo.push(
          <div hey={repositoId}>
            <p>Nome do repositorio: {reposito.name}</p>
            <p>URL: {reposito.git_url}</p>
            <hr/>
          </div>
          )            
        });
      }

        return (
            <div>
                <header>
                  <h1>Pesquisa de usuários do GitHub </h1>
                </header>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input ref='username' type='text' placeholder='Username' />
                    <button type="submit">Procurar</button>
                </form>
                {user}
                {repo}
            </div>
        );
    }
}


export default App;
