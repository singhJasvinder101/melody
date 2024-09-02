import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import { formatSecondsToMinutes } from '../helpers/miscellaneous'
import { colors, fontSize } from '../constants'
import { defaultStyles } from '../../styles'

const PlayerProgressBar = () => {
    const { duration, position } = useProgress(250)

    const isSliding = useSharedValue(false)
    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)

    const trackElapsedTime = formatSecondsToMinutes(position)
    const trackRemainingTime = formatSecondsToMinutes(duration - position)


    // at beginning if user is not sliding, update the default progress
    if (!isSliding.value) {
        progress.value = duration > 0 ? position / duration : 0
    }

    return (
        <View className=''>
            <Slider
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                thumbWidth={0}
                onSlidingStart={() => isSliding.value = true}
                theme={{
                    minimumTrackTintColor: colors.primary,
                    maximumTrackTintColor: colors.maximumTrackTintColor,
                    bubbleBackgroundColor: colors.primary,
                }}
                onValueChange={async (value) => {
                    console.log(value)
                    await TrackPlayer.seekTo(value * duration)
                }}
                onSlidingComplete={async (value) => {
                    // if the user is not sliding, we should not update the position
                    if (!isSliding.value) return;

                    // Mark that user shown interactivity
                    isSliding.value = false;

                    // Seek to the new position in the track
                    await TrackPlayer.seekTo(value * duration);
                }}

            />

            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{trackElapsedTime}</Text>

                <Text style={styles.timeText}>
                    {'-'} {trackRemainingTime}
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 20,
    },
    timeText: {
        ...defaultStyles.text,
        color: colors.text,
        opacity: 0.75,
        fontSize: fontSize.xs,
        letterSpacing: 0.7,
        fontWeight: '500',
    },
})

export default PlayerProgressBar