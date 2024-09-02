import { Playlist } from '@/helpers/types'
import React, { useMemo } from 'react'
import { FlatList, FlatListProps, Image, Text, View } from 'react-native'
import { useTracks } from '../store/data'
import { PlaylistListItem } from './PlaylistListItem'
import { playlistNameFilter } from '../helpers/filter'
import { unknownTrackImageUri } from '../constants/images'

type PlaylistsListProps = {
    playlists: Playlist[]
    onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>


const ItemDivider = () => (
    <View style={{ marginLeft: 80, marginVertical: 12 }} />
)


export const PlaylistsList = ({
    playlists,
    onPlaylistPress: handlePlaylistPress,
    ...flatListProps
}: PlaylistsListProps) => {

    return (
        <FlatList
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={ItemDivider}
            ListEmptyComponent={
                <View>
                    <Text >No playlist found</Text>

                    <Image
                        source={{ uri: unknownTrackImageUri }}
                    />
                </View>
            }
            data={playlists}
            renderItem={({ item: playlist }) => (
                <PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)} />
            )}
            {...flatListProps}
        />
    )
}