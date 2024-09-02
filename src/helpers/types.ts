import { Track } from 'react-native-track-player';

export type TrackWithPlaylist = Track & { playlist?: string[] };

export type Playlist = {
    name: string;
    tracks: Track[];
    artworkPreview: string;
}

export type artist = {
    name: string;
    image?: string;
    tracks: Track[];
    albums?: Playlist[];
    bio?: string;
    rating?: number;
}

