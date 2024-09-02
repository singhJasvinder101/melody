import { View, Text, Image, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'react-native-auto-route';
import { Track, useActiveTrack } from 'react-native-track-player'
import { unknownTrackImageUri } from '../constants/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MovingText from '../components/MovingText';
import { Icon } from '../lib/Icons';
import { colors } from '../constants';
import PlayerControls from '../components/PlayerControls';
import PlayerProgressBar from '../components/PlayerProgressBar';
import { PlayerRepeatToggle } from '../components/PlayerLoop';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import usePlayerBackground from '../hooks/usePlayerBackground';
import useTrackPlayerFavorite from '../hooks/useTrackPlayerFavorite';

const Player = () => {
    const router = useRouter();
    const activeTrack = useActiveTrack() as Track;
    const { isFavorite, toggleFavorite } = useTrackPlayerFavorite(activeTrack);
    let imageColor = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri) as any;


    if (!activeTrack) {
        return (
            // <View className='flex-1 flex items-center justify-center'>
            //     <ActivityIndicator size="large" color="#999999" />
            // </View>
            null
        );
    }


    const gradientColors = [
        imageColor?.dominant || colors.background,
        imageColor?.average || colors.primary,
    ];

    console.log(imageColor)
    console.log(imageColor?.dominant, imageColor?.darkVibrant)

    return (
        <LinearGradient style={{ flex: 1, height: '100%' }} colors={gradientColors} >
            <View className='header'>
                <View className='flex flex-row justify-between items-center p-4'>
                    <Entypo name='chevron-down' size={30} color={colors.icon} onPress={() => router.back()} />
                </View>
            </View>
            <View className='my-16' style={styles.imageContainer}>
                <Image style={styles.image}
                    source={{ uri: activeTrack.artwork ?? unknownTrackImageUri }}
                />
            </View>
            <View className='flex-1'>
                <View className='w-[80%] mb-8 mt-auto mx-auto'>
                    <View className='flex flex-row justify-between items-center'>
                        <View className='flex-1 my-8 overflow-hidden'>
                            <MovingText
                                text={activeTrack.title ?? ''}
                                threshold={30}
                            />


                            {activeTrack.artist && (
                                <Text numberOfLines={1}>
                                    {activeTrack.artist}
                                </Text>
                            )}
                        </View>


                        <FontAwesome
                            name={isFavorite ? 'heart' : 'heart-o'}
                            size={20}
                            color={isFavorite ? colors.primary : colors.icon}
                            style={{ marginHorizontal: 14 }}
                            onPress={() => toggleFavorite()}
                        />
                    </View>


                    <View className='mt-auto' >
                        <PlayerProgressBar />

                        <PlayerControls isPrimary={false} style={{ marginTop: 40 }} />

                    </View>

                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '90%',
        height: '35%',
        marginVertical: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.44,
        shadowRadius: 11.0,
        // Elevation for Android
        elevation: 10,
        alignItems: 'center',
        margin: 'auto'
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        resizeMode: 'cover',
    },

    icon: {
    }
});

export default Player;
