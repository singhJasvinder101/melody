import { View, Text, TouchableHighlight, StyleSheet, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../constants';
import { defaultStyles } from '../../styles';
import { Image } from 'react-native';
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player';
import { Icon } from '../lib/Icons';
import { Blurhash } from 'react-native-blurhash';
import { unknownTrackImageUri } from '../constants/images';
import LoaderKit from 'react-native-loader-kit'
import MovingText from './MovingText';
import TrackShortcutsMenu from './TrackShortcutsMenu';

interface TrackListItemProps {
    track: Track;
    onTrackSelect: (track: Track) => void;
}

const TrackListItem = ({ track, onTrackSelect }: TrackListItemProps) => {
    const isActiveTrack = useActiveTrack()?.url === track.url;
    const [imageLoaded, setImageLoaded] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;
    const { playing } = useIsPlaying();

    const onImageLoad = () => {
        setImageLoaded(true);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableHighlight activeOpacity={0.3} underlayColor={colors.text} onPress={() => onTrackSelect(track)} >
            <View className="flex gap-5 flex-row py-2">
                <View style={{ position: 'relative' }} className='relative h-auto w-auto'>
                    <Animated.Image
                        source={{ uri: track.artwork ?? unknownTrackImageUri }}
                        style={[styles.trackArtworkImage, { opacity }]}
                        onLoad={onImageLoad}
                    />
                    {isActiveTrack && (playing && (
                        <LoaderKit
                            className='absolute top-[25%] left-[25%] right-[25%] bottom-[25%]'
                            name="LineScaleParty"
                            color='white'
                        />
                    ))}
                </View>
                <View style={{ width: '100%' }} className="flex flex-row justify-between"  >
                    <View className="flex-1 w-3/5" >
                        <Text
                            numberOfLines={1}
                            style={{
                                ...styles.trackTitleText,
                                color: isActiveTrack ? colors.primary : colors.text,
                                fontWeight: isActiveTrack ? 'bold' : 'normal'
                            }}
                        >
                            {track.title}
                        </Text>
                        {track.artist && (
                            <Text numberOfLines={1} style={styles.trackArtistText}>
                                {track.artist}
                            </Text>
                        )}
                    </View>
                    <View onStartShouldSetResponder={() => true} onTouchEnd={(e) => e.stopPropagation()} className="w-2/5 " >
                        <TrackShortcutsMenu track={track} >
                            <Icon iconName="dots" size={20} color={colors.textMuted} />
                        </TrackShortcutsMenu>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    trackArtworkImage: {
        borderRadius: 12,
        width: 50,
        height: 50
    },
    trackTitleText: {
        ...defaultStyles.text,
        fontSize: 16,
        fontWeight: '600',
        maxWidth: '90%'
    },
    trackArtistText: {
        ...defaultStyles.text,
        color: colors.textMuted,
        fontSize: 14,
        marginTop: 4,
    },
})

export default TrackListItem