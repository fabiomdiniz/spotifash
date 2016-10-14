import { Component, Input } from '@angular/core';
import { Track } from './track';

@Component({
  selector: 'my-track',
  template: `
  <div *ngIf="track">
    <figure class="track-card"><img [src]="getImage()" class="background"/>
                             <img [src]="getImage()" class="profile"/>
      <figcaption>
        <h3>{{ track.name }}<span>{{ track.artists[0].name }}</span></h3>
        <div class="icons"><a href="#"><i class="ion-social-reddit-outline"></i></a><a href="#"> <i class="ion-social-twitter-outline"></i></a><a href="#"> <i class="ion-social-vimeo-outline"></i></a></div>
      </figcaption>
    </figure>
  </div>
`,
  styles: [`@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,600);
@import url(http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
.track-card {
  font-family: 'Open Sans', Arial, sans-serif;
  position: relative;
  float: left;
  overflow: hidden;
  margin: 10px 1%;
  min-width: 230px;
  max-width: 315px;
  width: 100%;
  color: #ffffff;
  text-align: center;
  line-height: 1.4em;
  background-color: #141414;
}
.track-card * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.track-card .background {
  width: 100%;
  vertical-align: top;
  opacity: 0.2;
  -webkit-filter: grayscale(100%) blur(2px);
  filter: grayscale(100%) blur(2px);
  -webkit-transition: all 2s ease;
  transition: all 2s ease;
}
.track-card figcaption {
  width: 100%;
  padding: 15px 25px;
  position: absolute;
  left: 0;
  top: 50%;
}
.track-card .profile {
  border-radius: 50%;
  position: absolute;
  bottom: 50%;
  left: 50%;
  max-width: 100px;
  opacity: 1;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.5);
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
}
.track-card h3 {
  margin: 0 0 5px;
  font-weight: 400;
  font-size: 1.50rem;
}
.track-card h3 span {
  display: block;
  font-size: 0.6em;
  color: #f39c12;
  opacity: 0.75;
}
.track-card i {
  padding: 10px 5px;
  display: inline-block;
  font-size: 32px;
  color: #ffffff;
  text-align: center;
  opacity: 0.65;
}
.track-card a {
  text-decoration: none;
}
.track-card i:hover {
  opacity: 1;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
.track-card:hover .background,
.track-card.hover .background {
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
}
`]
})
export class TrackComponent {
  @Input()
  track: Track;
  getImage(): string {
    if(this.track.album.images.length) {
      return this.track.album.images[0].url;
    }
    return 'unknown.png'
  }
}
