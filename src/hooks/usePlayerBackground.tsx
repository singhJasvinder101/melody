import React, { useEffect, useState } from 'react'
import { getColors, ImageColorsResult } from 'react-native-image-colors'
import { colors } from '../constants'
import { Track, useActiveTrack } from 'react-native-track-player'


const usePlayerBackground = (imageUrl: string) => {
    const [imageColor, setImageColor] = useState<ImageColorsResult>()
    const activeTrack = useActiveTrack() as Track

    useEffect(() => {
        getColors(imageUrl, {
            fallback: colors.background,
            cache: true,
            key: imageUrl,
        }).then((colors) => {
            setImageColor(colors as ImageColorsResult)
        })
    }, [activeTrack?.artwork])

    return imageColor
}

export default usePlayerBackground