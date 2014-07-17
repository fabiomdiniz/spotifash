import {Component, OnInit} from '@angular/core';
import SpotifyService from './spotify';
import { Hero } from './hero';

const HEROES: Hero[] = [
{ id: 11, name: 'Mr. Nice' },
{ id: 12, name: 'Narco' },
{ id: 13, name: 'Bombasto' },
{ id: 14, name: 'Celeritas' },
{ id: 15, name: 'Magneta' },
{ id: 16, name: 'RubberMan' },
{ id: 17, name: 'Dynama' },
{ id: 18, name: 'Dr IQ' },
{ id: 19, name: 'Magma' },
{ id: 20, name: 'Tornado' }
];

@Component({
  selector: 'fab-hero',
  template:`{{hero.name}}`
})

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
  template:`
    <h1>{{title}}</h1>
    <img src="http://25.media.tumblr.com/tumblr_mdtzgsKeaT1rlzw9do1_500.gif" />
    <div *ngIf="!token">
    <button      (click)="goLogin()">
    Log to spotify
    </button>
    </div>
    <div *ngIf="token">
      <h1> Hello {{ user.display_name }} </h1>
      <h2>Top Tracks</h2>
      <ul>
        <li *ngFor="let track of topTracks.items">
          <span>{{track.name}} by {{ track.artists[0].name }}</span>
        </li>
      </ul>
      <h2>Top Artists</h2>
      <ul>
        <li *ngFor="let artist of topArtists.items">
          <span>{{artist.name}}</span>
        </li>
      </ul>
    </div>
    <!--<h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes"
      [class.selected]="hero === selectedHero"
      (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>-->
    `,
    styles: [`
`]
})
export class AppComponent implements OnInit {
  title = 'Spotifash';
  token = '';
  user = {};
  topTracks = {};
  topArtists = {};
  selectedHero: Hero;
  heroes = HEROES;
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
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  goLogin(): void {
    this.spotifyService.login().subscribe(
            token => {
                this.initSpotifyData();
            },
            err => console.error(err),
            () => { });
  }
}
