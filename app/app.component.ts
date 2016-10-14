import {Component, OnInit} from '@angular/core';
import SpotifyService from './spotify';
import { User } from './track';

@Component({
  selector: 'my-app',
  providers: [
      SpotifyService,
      {
        provide: "SpotifyConfig",
        useValue: {
            clientId: '11407a3ca2f34b698745f04d81f2a24d',
            redirectUri: 'https://spotifash.herokuapp.com/callback.html',
            scope: 'user-top-read',
            authToken: localStorage.getItem('angular2-spotify-token')
        }
      }
  ],
  templateUrl: 'app/app.component.html',
  styleUrls:  ['app/app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spotifash';
  token = '';
  user: User;
  topTracks = {};
  topArtists = {};
  constructor(private spotifyService: SpotifyService) {
  };
  ngOnInit() {
    this.token = localStorage.getItem('angular2-spotify-token');
    if(this.token) {
      this.initSpotifyData();
    }
  }
  initSpotifyData(): void {
    this.spotifyService.getCurrentUser().subscribe(data => {
      this.user = data;
      console.log(this.user);
    },
    err => {
      console.error(err);
      this.goLogout();
    });

    this.spotifyService.getCurrentUserTopTracks().subscribe(data => {
      this.topTracks = data;
      console.log(data);
    });

    this.spotifyService.getCurrentUserTopArtists().subscribe(data => {
      this.topArtists = data;
      console.log(data);
    });


  }
  goLogin(): void {
    this.spotifyService.login().subscribe(
            token => {
                this.token = localStorage.getItem('angular2-spotify-token');
                this.initSpotifyData();
            },
            err => console.error(err),
            () => { });
  }
  goLogout(): void {
    this.token = '';
    this.user = new User();
    localStorage.removeItem('angular2-spotify-token');
  }
  getUserImage(): string {
    if(this.user && this.user.images.length > 0) {
      return this.user.images[0].url;
    }
  }
}
