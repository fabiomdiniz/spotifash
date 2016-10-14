export class Image {
  url: string;
}

export class Artist {
  name: string;
  images: Image[];
  getImage(): string {
    if(this.images.length) {
      return this.images[0].url;
    }
    return 'unknown.png'
  }
}

export class Album {
  images: Image[];
  getImage(): string {
    if(this.images.length) {
      return this.images[0].url;
    }
    return 'unknown.png'
  }
}

export class Track {
  artists: Artist[];
  album: Album;
  name: string;
  getImage(): string {
    return this.album.getImage();
  }
}
