import { View, Text, SafeAreaView, StatusBar, Button } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useRoute, useRouter } from 'react-native-auto-route';
import TracksList from '../../components/TracksList';
import { trackTitleFilter } from '../../helpers/filter';
import { Track } from 'react-native-track-player';
import { Searchbar } from 'react-native-paper';
import { Icon } from '../../lib/Icons';
import { colors } from '../../constants';
import { useFavorites } from '../../store/data';
import { generateTrackListId } from '../../helpers/miscellaneous';

const Favorites = () => {
  const route = useRoute();
  // ${StatusBar.currentHeight}px
  const [searchQuery, setSearchQuery] = useState('');

  const favoriteTracks = useFavorites().favorites;
  const filteredFavoritesTracks = useMemo(() => {
    if (!searchQuery) return favoriteTracks

    return favoriteTracks.filter(trackTitleFilter(searchQuery))
  }, [searchQuery, favoriteTracks])

  const mtop = Math.floor(StatusBar.currentHeight as number);
  console.log(mtop);


  return (
    <SafeAreaView className='flex-1'>
      <StatusBar barStyle='light-content' />
      <View style={{ paddingTop: mtop }} className={`flex-1 px-4 bg-black w-full`}>
        <Text className='text-3xl py-4 capitalize text-white font-bold'>{route.name}</Text>

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
          <TracksList id={generateTrackListId('favorites', searchQuery)} tracks={filteredFavoritesTracks as Track[]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
