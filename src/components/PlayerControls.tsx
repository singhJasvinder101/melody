import { View, Text, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import { Icon } from '../lib/Icons'
import { colors } from '../constants'
import { PlayerRepeatToggle } from './PlayerLoop'


interface PlayerControlsProps {
    style: ViewStyle;
    isPrimary?: boolean;
}

interface PlayerButtonProps {
    style?: ViewStyle;
    iconSize?: number;
    isPrimary?: boolean;
}


const PlayerControls = ({ style, isPrimary }: PlayerControlsProps) => {

    return (
        <View style={[styles.container, style]}>
            <View className='flex flex-row gap-2  justify-between items-center'>
                <SkipToPreviousButton iconSize={25} isPrimary={isPrimary} />

                <PlayPauseButton iconSize={45} isPrimary={isPrimary} />

                <SkipToNextButton iconSize={25} isPrimary={isPrimary} />


                <PlayerRepeatToggle size={30} color={colors.textMuted} />
            </View>
        </View>
    )
}


export const PlayPauseButton = ({ iconSize, style, isPrimary }: PlayerButtonProps) => {
    const { playing } = useIsPlaying()

    return (
        <View style={style}>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
            >
                <Icon iconName={playing ? 'pause' : 'play'} size={iconSize as number} color={isPrimary ? colors.primary : colors.textMuted} />
            </TouchableOpacity>
        </View>
    )
}

export const SkipToPreviousButton = ({ iconSize = 30, style, isPrimary }: PlayerButtonProps) => {
    return (
        <TouchableOpacity style={style} activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()} >
            <Icon iconName='previous' size={iconSize} color={isPrimary ? colors.primary : colors.textMuted} />
        </TouchableOpacity>
    )
}

export const SkipToNextButton = ({ iconSize = 30, style, isPrimary }: PlayerButtonProps) => {
    return (
        <TouchableOpacity style={style} activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()} >
            <Icon iconName='next' size={iconSize} color={isPrimary ? colors.primary : colors.textMuted} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
})

export default PlayerControls