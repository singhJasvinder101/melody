import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withDelay, withRepeat, cancelAnimation } from 'react-native-reanimated';

interface MovingTextProps {
    text: string;
    threshold: number;
    style?: any;
    className?: string;
}

const MovingText = ({ text, threshold, style, className }: MovingTextProps) => {
    const translateX = useSharedValue(0)
    const shouldAnimate = text.length >= threshold

    const textWidth = text.length * 3

    useEffect(() => {
        if (!shouldAnimate) return
        translateX.value = withDelay(
            500,
            withRepeat(
                withTiming(-textWidth, {
                    duration: 5000,
                    easing: Easing.linear,
                }),
                -1,
                true,
            ),
        )

        return () => {
            cancelAnimation(translateX)
            translateX.value = 0
        }
    }, [translateX, text, threshold, shouldAnimate, textWidth])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    }, []);

    return (
        <Animated.Text
            className={className}
            numberOfLines={1}
            style={[style, animatedStyle]}
        >
            {text}
        </Animated.Text>
    );
};

export default MovingText;
