import { View, Text, FlatList, FlatListProps, Image } from 'react-native'
import React, { useRef } from 'react'
import TrackListItem from './TrackListItem'
import TrackPlayer, { Track } from 'react-native-track-player'
import { unknownTrackImageUri } from '../constants/images'
import { useQueue } from '../store/queue'


export type TrackListProps = Partial<FlatListProps<Track>> & {
    id?: string;
    tracks: Track[];
}

const TracksList = ({ id, tracks, ...FlatListProps }: TrackListProps) => {
    const { activeQueueId, setActiveQueueId } = useQueue()

    const handleSelectTrack = async (selectedTrack: Track) => {
        // console.log(track)
        // await TrackPlayer.load(track)
        // await TrackPlayer.play()
        const trackIndex = tracks.findIndex(track => track.id === selectedTrack.id)
        if (trackIndex === -1) return
        
        const isChangingQueue = id !== activeQueueId;
        // console.log(activeQueueId, id, isChanginQueue)
        
        if (isChangingQueue) {
            await TrackPlayer.reset();
            
            // Add the tracks to the queue, starting with the selected track
            await TrackPlayer.add(tracks.slice(trackIndex));
            await TrackPlayer.add(tracks.slice(0, trackIndex));
            
            await TrackPlayer.play();
            setActiveQueueId(id as string);
        } else {
            // Calculate the relative index in the current queue
            const currentQueue = await TrackPlayer.getQueue();
            const currentTrackIndex = currentQueue.findIndex(track => track.id === selectedTrack.id);
            // console.log(currentQueue, trackIndex)
            
            if (currentTrackIndex !== -1) {
                await TrackPlayer.skip(currentTrackIndex);
                await TrackPlayer.play();
            }
        }
    }

    return (
        <FlatList
            data={tracks}
            ListEmptyComponent={() => (
                <View>
                    <Text className='text-md font-semibold text-center my-3'>No tracks found</Text>
                    <Image
                        source={{ uri: unknownTrackImageUri }}
                        className='w-52 h-52 rounded-lg opacity-5 my-4 block mx-auto'
                    />
                </View>
            )}
            renderItem={({ item: track }) => (
                <TrackListItem
                    track={track}
                    onTrackSelect={handleSelectTrack}
                />
            )}
            style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}
            {...FlatListProps}
        />
    )
}

export default TracksList