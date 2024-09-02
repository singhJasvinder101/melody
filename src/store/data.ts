import { Track } from "react-native-track-player";
import { artist, Playlist, TrackWithPlaylist } from "../helpers/types";
import { create } from 'zustand';
import data from '../../assets/data.json';
import { unknownTrackImageUri } from "../constants/images";

interface dataState {
    tracks: TrackWithPlaylist[];
    toggleTrackFavorite: (track: Track) => void;
    addToPlaylist: (track: Track, playlist: string) => void;
}

export const useStore = create<dataState>()((set) => ({
    tracks: data,
    toggleTrackFavorite: (track) => 
        set((state) => ({
            tracks: state.tracks.map(t => (
                t.url === track.url ? { ...t, rating: t.rating === 1 ? 0 : 1 } : t
            ))
        })),
    addToPlaylist: (track, playlistName) => { 
        set((state) => ({
            tracks: state.tracks.map(t => (
                t.url === track.url ? { ...t, playlist: [...t.playlist as string[], playlistName] } : t
            ))
        }))
    },
}))


export const useTracks = () => useStore(state => state.tracks);
export const useFavorites = () => {
    const favorites = useStore((state) => state.tracks.filter((track) => track.rating === 1))
    const toggleTrackFavorite = useStore((state) => state.toggleTrackFavorite)

    return {
        favorites,
        toggleTrackFavorite,
    }
}
export const useArtists = () => {
    return useStore(state => state.tracks.reduce((acc, track) => {
        const existingArtists = acc.find((artist) => artist.name === track.artist)

        if (existingArtists) {
            // add their tracks (new option(object))
            existingArtists.tracks.push(track)
        } else {
            acc.push({
                name: track.artist ?? 'Unknown' as string,
                tracks: [track] as Track[],
            })
        }
        return acc
    }, [] as artist[])) 
}
export const usePlaylists = () => {
    const playlists = useStore((state) => {
        return state.tracks.reduce((acc, track) => {
            track.playlist?.forEach((playlistName) => {
                const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)

                if (existingPlaylist) {
                    existingPlaylist.tracks.push(track)
                } else {
                    acc.push({
                        name: playlistName,
                        tracks: [track],
                        artworkPreview: track.artwork ?? unknownTrackImageUri,
                    })
                }
            })

            return acc
        }, [] as Playlist[])
    })

    const addToPlaylist = useStore((state) => state.addToPlaylist)

    return { playlists, addToPlaylist }
}
