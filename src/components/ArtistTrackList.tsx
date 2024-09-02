import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { StatusBar } from 'react-native';
import { useTracks } from '../store/data';
import { trackTitleFilter } from '../helpers/filter';
import { Searchbar } from 'react-native-paper';
import { Icon } from '../lib/Icons';
import { colors, fontSize } from '../constants';
import QueueControlsTrackList from './QueueControlsTrackList';
import TracksList from './TracksList';
import { generateTrackListId } from '../helpers/miscellaneous';
import { defaultStyles } from '../../styles';
import { unknownArtistImageUri } from '../constants/images';
import { artist } from '../helpers/types';

const ArtistsTrackList = ({ artist }: { artist: artist }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    // ${StatusBar.currentHeight}px

    const mtop = Math.floor(StatusBar.currentHeight as number);
    const tracks = useTracks();

    const filteredSongs = useMemo(() => {
        if (!searchQuery) return tracks;

        return tracks.filter(trackTitleFilter(searchQuery));
    }, [searchQuery])


    return (
        <SafeAreaView className='flex-1'>
            <StatusBar barStyle='light-content' />
            <View style={{ paddingTop: mtop, paddingBottom: 3 }} className='w-full'>
                <Text className='text-3xl py-4 capitalize text-black font-bold'>Songs</Text>
                <Searchbar
                    className='mb-3'
                    placeholder="Search"
                    placeholderTextColor="white"
                    icon={({ size, color }: any) => (
                        <Icon iconName="search" size={20} color={color} />
                    )}
                    clearIcon={() =>
                        searchQuery ? (
                            <Icon iconName="cross" size={20} color={colors.primary} />
                        ) : null
                    }
                    iconColor={colors.primary}
                    theme={{ colors: { primary: colors.primary } }}
                    style={{ backgroundColor: colors.backgroundSecondary }}
                    inputStyle={{ color: colors.text }}
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                {filteredSongs && <TracksList
                    id={generateTrackListId(artist.name, searchQuery)}
                    ListHeaderComponent={
                        <View>
                            <View style={styles.artworkImageContainer}>
                                <Image
                                    source={{
                                        uri: unknownArtistImageUri,
                                    }}
                                    style={styles.artistImage}
                                />
                            </View>

                            <Text numberOfLines={1} style={styles.artistNameText}>
                                {artist.name}
                            </Text>

                            {searchQuery.length === 0 && (
                                <QueueControlsTrackList tracks={filteredSongs} style={{ paddingTop: 24 }} />
                            )}
                        </View>
                    }
                    tracks={filteredSongs}
                />}
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    artistHeaderContainer: {
        flex: 1,
        marginBottom: 32,
    },
    artworkImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 200,
    },
    artistImage: {
        width: '60%',
        height: '90%',
        resizeMode: 'cover',
        borderRadius: 128,
    },
    artistNameText: {
        ...defaultStyles.text,
        marginTop: 22,
        textAlign: 'center',
        fontSize: fontSize.lg,
        fontWeight: '800',
    },
})
export default ArtistsTrackList