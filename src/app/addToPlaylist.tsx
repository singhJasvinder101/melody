import { useHeaderHeight } from '@react-navigation/elements'
import { StyleSheet } from 'react-native'
import { useParams, useRouter } from 'react-native-auto-route'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrackPlayer, { Track } from 'react-native-track-player'
import { usePlaylists, useTracks } from '../store/data'
import { defaultStyles } from '../../styles'
import { screenPadding } from '../constants'
import { useQueue } from '../store/queue'
import { Playlist } from '../helpers/types'
import { PlaylistsList } from '../components/PlaylistsList'

const addToPlaylist = () => {
    const { playlists, addToPlaylist } = usePlaylists()
    const tracks = useTracks()
    const { trackUrl } = useParams()

    const router = useRouter()
    const headerHeight = useHeaderHeight()
    
    const track = tracks.find((currentTrack) => trackUrl === currentTrack.url)
    const { activeQueueId } = useQueue()


    // track was not found
    if (!track) {
        return null
    }

    const availablePlaylists = playlists.filter(
        (playlist) => !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url),
    )

    const handlePlaylistPress = async (playlist: Playlist) => {
        addToPlaylist(track, playlist.name)

        // should close the modal
        router.back()

        // if the current queue is the playlist we're adding to, add the track at the end of the queue
        if (activeQueueId?.startsWith(playlist.name)) {
            await TrackPlayer.add(track)
        }
    }

    return (
        <SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
            <PlaylistsList playlists={availablePlaylists} onPlaylistPress={handlePlaylistPress} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        ...defaultStyles.container,
        paddingHorizontal: screenPadding.horizontal,
    },
})

export default addToPlaylist