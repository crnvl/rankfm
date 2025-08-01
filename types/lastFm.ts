export interface Album {
  name: string;
  artist: string;
  url: string;
  image: Image[];
  streamable: string;
  mbid: string;
}

export interface Image {
  "#text": string;
  size: Size;
}

export enum Size {
  Extralarge = "extralarge",
  Large = "large",
  Medium = "medium",
  Small = "small",
}

export interface DetailedAlbum {
  artist: ArtistEnum;
  mbid: string;
  tags: Tags;
  playcount: string;
  image: Image[];
  tracks: Tracks;
  url: string;
  name: string;
  listeners: string;
  wiki: Wiki;
}

export enum ArtistEnum {
  Uicideboy = "$uicideboy$",
}

export interface Tags {
  tag: Tag[];
}

export interface Tag {
  url: string;
  name: string;
}

export interface Tracks {
  track: Track[];
}

export interface Track {
  streamable: Streamable;
  duration: number;
  url: string;
  name: string;
  "@attr": Attr;
  artist: ArtistClass;
}

export interface Attr {
  rank: number;
}

export interface ArtistClass {
  url: string;
  name: ArtistEnum;
  mbid: string;
}

export interface Streamable {
  fulltrack: string;
  "#text": string;
}

export interface Wiki {
  published: string;
  summary: string;
  content: string;
}
