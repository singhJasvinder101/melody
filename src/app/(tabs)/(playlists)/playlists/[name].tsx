import { ScrollView, View } from 'react-native'
import { Redirect, useParams, useRouter } from 'react-native-auto-route'
import { usePlaylists } from '../../../../store/data'
import { screenPadding } from '../../../../constants'
import { defaultStyles } from '../../../../../styles'
import React, { useMemo } from 'react'
import { playlistNameFilter } from '../../../../helpers/filter'
import { Playlist } from '../../../../helpers/types'
import PlaylistTrackList from '../../../../components/PlaylistTrackList'

const PlaylistScreen = () => {
    const { name: playlistName } = useParams()

    const { playlists } = usePlaylists()
    const playlist = playlists.find((playlist) => playlist.name === playlistName)


    if (!playlist) {
        console.warn(`Playlist ${playlistName} was not found!`)

        return <Redirect to={'app/(tabs)/(playlists)'} />
    }

    return (
        <View style={defaultStyles.container}>
            <PlaylistTrackList
                playlist={playlist as Playlist}
            />
        </View>
    )
}

export default PlaylistScreen