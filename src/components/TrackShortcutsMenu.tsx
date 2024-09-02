import { View, Text } from 'react-native'
import React, { PropsWithChildren } from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import { MenuView } from '@react-native-menu/menu'
import { match } from 'ts-pattern'
import { useFavorites } from '../store/data'
import { useQueue } from '../store/queue'
import { useRouter } from 'react-native-auto-route'
import useTrackPlayerFavorite from '../hooks/useTrackPlayerFavorite'

type trackMenuProps = PropsWithChildren<{ track: Track }>

const TrackShortcutsMenu = ({ track, children }: trackMenuProps) => {
    const router = useRouter()

    const { favorites, toggleTrackFavorite } = useFavorites();
    const isFavorite = favorites.find(t => t.url === track.url)?.rating === 1
    const { activeQueueId } = useQueue()

    const handlePressAction = (id: string) => {
        match(id)
            .with('add-to-favorites', async () => {
                toggleTrackFavorite(track)

                // if track is in favorite queue add it
                if (activeQueueId?.includes('favorites')) {
                    await TrackPlayer.add(track)
                }
            })
            .with('remove-from-favorites', async () => {
                toggleTrackFavorite(track)
                const currentQueue = await TrackPlayer.getQueue();

                const trackInQueue = currentQueue.find(t => t.url === track.url)
                await TrackPlayer.remove(trackInQueue?.id)
            })
            .with('add-to-playlist', () => {
                router.push({
                    screen: 'app/addToPlaylist',
                    params: {
                        track,
                    }
                })
            })
            .with('otherwise', () => {
                console.warn('Unknown action', id)
            })
    }

    return (
        <MenuView
            onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
            actions={
                [
                    {
                        id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
                        title: isFavorite ? 'Remove from favorites ★' : 'Add to favorites ☆',
                        image: isFavorite ? 'star.fill' : 'star',
                    },
                    {
                        id: 'add-to-playlist',
                        title: 'Add to playlist',
                        image: 'plus',
                    },
                ]}
        >
            {children}
        </MenuView >
    )
}

export default TrackShortcutsMenu