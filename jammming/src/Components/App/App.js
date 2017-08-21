import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    if (
      playlistTracks.every(trackInPlaylist => trackInPlaylist.id !== track.id)
    ) {
      playlistTracks.push(track);
      this.setState({
        playlistTracks: playlistTracks
      });
    }
  }

  removeTrack(track) {
    let oldPlaylistTracks = this.state.playlistTracks;
    let newPlaylistTracks = oldPlaylistTracks.filter(
      element => element.id !== track.id
    );
    this.setState({
      playlistTracks: newPlaylistTracks
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  updateSearchResults(searchResults) {
    this.setState({
      searchResults: []
    });
  }

  savePlaylist() {
    let playlistTrackUris = this.state.playlistTracks.map(track => track.uri);
    let playlistName = this.state.playlistName;

    Spotify.savePlaylist(playlistName, playlistTrackUris);

    this.updatePlaylistName("New Playlist");
    this.updateSearchResults([]);
  }

  search(term) {
    console.log(term);

    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
