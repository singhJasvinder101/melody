import { useEffect } from 'react';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, RatingType, RepeatMode } from 'react-native-track-player';

const setupPlayer = async (): Promise<boolean> => {
    let isSetup = false;
    try {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack != null) {
            isSetup = true;
        } else {
            throw new Error("No current track, setting up the player...");
        }
    } catch {
        await TrackPlayer.setupPlayer({
            maxCacheSize: 1024 * 10,
        });

        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            ratingType: RatingType.Heart,
            capabilities: [
                Capability.Play ?? Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
            compactCapabilities: [
                Capability.Play ?? Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
            ],
            progressUpdateEventInterval: 2,
        });
        await TrackPlayer.setVolume(0.6); // not too loud
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        isSetup = true;
    } finally {
        return isSetup;
    }
};

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
    useEffect(() => {
        const initializePlayer = async () => {
            try {
                const isSetup = await setupPlayer();
                if (isSetup) {
                    onLoad?.();
                }
                console.log("Loaded");
            } catch (error) {
                console.error(error);
            }
        };

        initializePlayer();

        return () => {
            // Optionally clean up TrackPlayer resources here
            TrackPlayer.stop();
        };
    }, [onLoad]);
};
