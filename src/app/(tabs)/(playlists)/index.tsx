import { View, Text, SafeAreaView } from 'react-native'
import React, { useMemo } from 'react'
import { useRoute, useRouter } from 'react-native-auto-route'
import { StatusBar } from 'react-native';
import { playlistNameFilter } from '../../../helpers/filter';
import { Playlist } from '../../../helpers/types';
import { usePlaylists } from '../../../store/data';
import { PlaylistsList } from '../../../components/PlaylistsList';
import { Searchbar } from 'react-native-paper';
import { Icon } from '../../../lib/Icons';
import { colors } from '../../../constants';

const playlists = () => {
    const { playlists } = usePlaylists()
    const router = useRouter();
    const [searchQuery, setSearchQuery] = React.useState('');

    const mtop = Math.floor(StatusBar.currentHeight as number);

    const filteredPlaylists = useMemo(() => {
        return playlists.filter(playlistNameFilter(searchQuery))
    }, [playlists, searchQuery])


    const handlePlaylistPress = (playlist: Playlist) => {
        // console.log(playlist)
        router.navigate({
            screen: 'app/(tabs)/(playlists)/playlists/[name]',
            params: { name: playlist.name }
        })
    }

    return (
        <SafeAreaView className='flex-1'>
            <StatusBar barStyle='light-content' />
            <View style={{ paddingTop: mtop }} className={`flex-1 px-4 bg-black w-full`}>
                <Text className='text-3xl py-4 capitalize text-white font-bold'>{'Playlists'}</Text>

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
                <PlaylistsList
                    scrollEnabled={false}
                    playlists={filteredPlaylists}
                    onPlaylistPress={handlePlaylistPress}
                />
            </View>
        </SafeAreaView>
    );
};

export default playlists