import { Playlist } from "./types"

export const trackTitleFilter = (title: string) => (track: any) => { 
    return track.title.toLowerCase().includes(title.toLowerCase())
}

export const artistsNameFilter = (artist: string) => (track: any) => { 
    return track.artist.toLowerCase().includes(artist.toLowerCase())
}

export const playlistNameFilter = (name: string) => (playlist: Playlist) =>
    playlist.name.toLowerCase().includes(name.toLowerCase())