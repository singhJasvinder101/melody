import { View, Text, Button, StatusBar } from 'react-native';
import React from 'react';
import { useRoute, type RouteProp, useRouter, useParams, Redirect } from 'react-native-auto-route';
import { useArtists } from '../../../../store/data';
import { ScrollView } from 'react-native-gesture-handler';
import { defaultStyles } from '../../../../../styles';
import ArtistsTrackList from '../../../../components/ArtistTrackList';
import { artist } from '../../../../helpers/types';
import { screenPadding } from '../../../../constants';

const ArtistDetails = () => {
    const router = useRouter();
    const { name: artistsName } = useParams()
    const mtop = Math.floor(StatusBar.currentHeight as number);

    const artists = useArtists()

    const artist = artists.find((artist) => artist.name === artistsName)
    if (!artistsName) {
        console.warn(`Artists with this ${artistsName} not found`)
        return <Redirect to={'app/(tabs)/artists'} />
    }


    return (
        <View style={{ paddingTop: mtop }} className={`flex-1 px-4 bg-black w-full`}>
            <ArtistsTrackList artist={artist as artist} />
        </View>
    )
}

export default ArtistDetails