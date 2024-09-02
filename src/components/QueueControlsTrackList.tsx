import {
    View, ViewProps, Text, StyleSheet, TouchableOpacity, Pressable as RNPressable,
    PressableProps as RNPressableProps, StyleProp, ViewStyle
} from 'react-native'
import React from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import { colors } from '../constants';
import { defaultStyles } from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

type QueueControlsTrackListProps = {
    tracks: Track[];
} & ViewProps

type MergePressableStylesFn = (style?: StyleProp<ViewStyle>, pressStyle?: ViewStyle) => RNPressableProps["style"];

const mergePressableStyles: MergePressableStylesFn = (style, pressStyle) => {
    return ({ pressed }) => pressed ? [style, pressStyle] : style;
};

const QueueControlsTrackList = ({ tracks, style, ...ViewProps }: QueueControlsTrackListProps) => {
    const handlePlay = async () => {
        await TrackPlayer.setQueue(tracks)
        await TrackPlayer.play()
    }

    const handleShufflePlay = async () => {
        const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5)

        await TrackPlayer.setQueue(shuffledTracks)
        await TrackPlayer.play()
    }

    return (
        <View className='flex flex-row gap-4 pb-3' {...ViewProps}>
            <RNPressable style={styles.button} className='flex-1' onPress={handlePlay} >
                <Ionicons name="play" size={22} />

                <Text style={styles.buttonText}>Play</Text>
            </RNPressable>

            <RNPressable style={styles.button} className='flex-1' onPress={handleShufflePlay}>
                <Ionicons name={'shuffle-sharp'} size={24} />

                <Text style={styles.buttonText}>Shuffle</Text>
            </RNPressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 12,
        backgroundColor: 'rgba(47, 47, 47, 0.2)',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 8,
    },
    buttonText: {
        ...defaultStyles.text,
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
})

export default QueueControlsTrackList