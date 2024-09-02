import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { StatusBar } from 'react-native';
import TracksList from '../../../components/TracksList';
import { Searchbar } from 'react-native-paper';
import { Icon } from '../../../lib/Icons';
import { colors } from '../../../constants';
import { trackTitleFilter } from '../../../helpers/filter';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTracks } from '../../../store/data';
import { generateTrackListId } from '../../../helpers/miscellaneous';
import QueueControlsTrackList from '../../../components/QueueControlsTrackList';

const index = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  // ${StatusBar.currentHeight}px

  const mtop = Math.floor(StatusBar.currentHeight as number);
  const tabBarBottomHeight = useBottomTabBarHeight();
  const tracks = useTracks();

  const filteredSongs = useMemo(() => {
    if (!searchQuery) return tracks;

    return tracks.filter(trackTitleFilter(searchQuery));
  }, [searchQuery])

  // console.log(filteredSongs);

  return (
    <SafeAreaView className='flex-1'>
      <StatusBar barStyle='light-content' />
      <View style={{ paddingTop: mtop, paddingBottom: 3 }} className='flex-1 px-4 bg-white pb-14 w-full'>
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
        <QueueControlsTrackList tracks={filteredSongs} />
        {filteredSongs && <TracksList id={generateTrackListId('songs')} tracks={filteredSongs} />}
      </View>
    </SafeAreaView>

  );
};

export default index