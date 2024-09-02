import { View, Text, SafeAreaView, FlatList, Image, StatusBar, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, useRoute, useRouter } from 'react-native-auto-route'
import { useArtists } from '../../../store/data';
import { artistsNameFilter } from '../../../helpers/filter';
import { Searchbar } from 'react-native-paper';
import { Icon } from '../../../lib/Icons';
import { colors } from '../../../constants';
import { unknownArtistImageUri, unknownTrackImageUri } from '../../../constants/images';

const Artists = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const mtop = Math.floor(StatusBar.currentHeight as number);
    const artists = useArtists();
    const router = useRouter();

    const filteredArtists = useMemo(() => {
        if (!searchQuery) return artists;
        return artists.filter(artistsNameFilter(searchQuery));
    }, [artists, searchQuery]);

    return (
        <SafeAreaView className='flex-1'>
            <StatusBar barStyle='light-content' />
            <View style={{ paddingTop: mtop }} className='flex-1 px-4 bg-black w-full'>
                <Text className='text-3xl py-4 capitalize text-white font-bold'>Artists</Text>

                <View>
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
                    <FlatList
                        data={[...filteredArtists]}
                        ListEmptyComponent={() => (
                            <View>
                                <Text className='text-md font-semibold text-center my-3'>No tracks found</Text>
                                <Image
                                    source={{ uri: unknownTrackImageUri }}
                                    className='w-52 h-52 rounded-lg opacity-5 my-4 block mx-auto'
                                />
                            </View>
                        )}
                        style={{ paddingHorizontal: 10, paddingVertical: 10 }}
                        renderItem={({ item: artist }) => (
                            <TouchableOpacity className='my-2' onPress={() =>
                                router.navigate({
                                    screen: 'app/(tabs)/(artists)/artists/[name]',
                                    params: { name: artist.name } // Make sure the correct artist name is passed here
                                })
                            }
                            >
                                <View className='flex flex-row items-center gap-3'>
                                    <Image
                                        source={{ uri: unknownArtistImageUri }}
                                        className='rounded-3xl w-12 h-12'
                                    />
                                    <View style={{ width: '100%' }}>
                                        <Text className='text-base' numberOfLines={1}>
                                            {artist.name}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Artists;
