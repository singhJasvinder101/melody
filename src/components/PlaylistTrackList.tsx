import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { Playlist } from '../helpers/types';
import { trackTitleFilter } from '../helpers/filter';
import TracksList from './TracksList';
import { generateTrackListId } from '../helpers/miscellaneous';
import QueueControlsTrackList from './QueueControlsTrackList';
import { defaultStyles } from '../../styles';
import { fontSize } from '../constants';

const PlaylistTrackList = ({ playlist }: { playlist: Playlist }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    // ${StatusBar.currentHeight}px


    const filteredPlaylistTracks = useMemo(() => {
        return playlist.tracks.filter(trackTitleFilter(searchQuery))
    }, [playlist.tracks, searchQuery])

    return (
        <View>
            <TracksList
                id={generateTrackListId('playlists', playlist.name)}
                tracks={filteredPlaylistTracks}
                ListHeaderComponent={
                    <View>
                        <View style={styles.artworkImageContainer}>
                            <Image
                                source={{
                                    uri: playlist.artworkPreview,
                                }}
                                style={styles.artworkImage}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.playlistNameText}>
                            {playlist.name}
                        </Text>

                        {searchQuery.length === 0 && (
                            <QueueControlsTrackList style={{ paddingTop: 24 }} tracks={playlist.tracks} />
                        )}
                    </View>
                }
            />
            <Text>PlaylistTrackList</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    playlistHeaderContainer: {
        flex: 1,
        marginBottom: 32,
    },
    artworkImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 300,
    },
    artworkImage: {
        width: '85%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12,
    },
    playlistNameText: {
        ...defaultStyles.text,
        marginTop: 22,
        textAlign: 'center',
        fontSize: fontSize.lg,
        fontWeight: '800',
    },
})

export default PlaylistTrackList