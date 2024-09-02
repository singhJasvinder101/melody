import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { Track, useActiveTrack } from 'react-native-track-player'
import { unknownTrackImageUri } from '../constants/images'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls'
import useLastActiveTrack from '../hooks/useLastActiveTrack'
import MovingText from './MovingText'
import { useRouter } from 'react-native-auto-route'

interface ViewProps {
    style: ViewStyle
}

const FloatingPlayer = ({ style }: ViewProps) => {
    const activeTrack = useActiveTrack()
    const lastActiveTrack = useLastActiveTrack()
    const router = useRouter()

    const displayedTrack: Track = activeTrack ?? lastActiveTrack as Track

    const handlePress = () => {
        router.navigate('app/player')
    }

    if (!activeTrack && !displayedTrack) return null

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={[style, styles.container]}>
            <>
                <Image
                    source={{ uri: displayedTrack.artwork ?? unknownTrackImageUri }}
                    className='w-12 h-12 rounded-lg'
                />
                <View className='flex-1 overflow-hidden ml-3'>
                    <MovingText
                        className='text-sm font-bold '
                        text={displayedTrack.title as string}
                        threshold={20}
                    />
                </View>

                <View className='flex h-full flex-row items-center mr-4 pl-4'>
                    <PlayPauseButton style={{ marginRight: 16 }} iconSize={24} />
                    <SkipToNextButton iconSize={22} />
                </View>
            </>
        </TouchableOpacity>
    )
}


export default FloatingPlayer

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#252525',
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10,
        zIndex: 1000
    },
})