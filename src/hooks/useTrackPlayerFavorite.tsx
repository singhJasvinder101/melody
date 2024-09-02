import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import TrackPlayer, { Track, useActiveTrack } from 'react-native-track-player'
import { useFavorites } from '../store/data';

const useTrackPlayerFavorite = (track: Track) => {

    const activeTrack = useActiveTrack() as Track;
    const { favorites, toggleTrackFavorite } = useFavorites();

    const isFavorite = favorites?.find((t) => t?.url === activeTrack?.url)?.rating === 1;
    const toggleFavorite = useCallback(async () => {
        const id = await TrackPlayer.getActiveTrackIndex();

        if (!id) return;

        await TrackPlayer.updateMetadataForTrack(id, { 
            rating: isFavorite ? 0 : 1
        })

        if (activeTrack) {
            toggleTrackFavorite(activeTrack)
        }

    }, [isFavorite, toggleTrackFavorite, activeTrack])

    return {
        isFavorite,
        toggleFavorite
    }
}

export default useTrackPlayerFavorite