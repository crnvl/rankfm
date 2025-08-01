export interface Album {
    name:       string;
    artist:     string;
    url:        string;
    image:      Image[];
    streamable: string;
    mbid:       string;
}

export interface Image {
    "#text": string;
    size:    Size;
}

export enum Size {
    Extralarge = "extralarge",
    Large = "large",
    Medium = "medium",
    Small = "small",
}
