export const formatSecondsToMinutes = (seconds: number) => { 
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.round(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`
}

export const generateTrackListId = (trackList: string, search?: string) => { 
    return `${trackList}${search ? `-${search}` : ''}`
}

