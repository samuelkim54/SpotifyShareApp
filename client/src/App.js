import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn: params.access_token ? true : false,
      nowPlaying:  { name: 'Not Checked', albumArt: '' }
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying(){
      spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
         this.setState({
           nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        })
      })
  }


  render() {
  return (
    <div className="App">
      <a href='http://localhost:8888'> 
       <button>Login with Spotify</button> </a>
      <div> Now Playing: { this.state.nowPlaying.name } </div>
      <div> <img src = { this.state.nowPlaying.albumArt } style={{height : 150}}/>
         </div>
      <div>Played Today: {this.state.recentlyPlayed}</div>
         { this.state.loggedIn &&
      <button onClick={()=> this.getNowPlaying()}>
        Check Now Playing
      </button>}
      { this.state.loggedIn &&
      <button onClick={()=> this.recentlyPlayed()}>
        Send Recently Played Music
      </button>}
    </div>
  );
 }
}

export default App;

{/*added to git 5/2/2020*/}
