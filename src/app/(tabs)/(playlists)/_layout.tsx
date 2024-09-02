import { Stack } from 'react-native-auto-route'
import { View } from 'react-native'
import { colors } from '../../../constants'
import { defaultStyles } from '../../../../styles'

const PlaylistScreenLayout = () => {
    return (
        <View style={defaultStyles.container}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        headerTitle: 'Playlist',
                    }}
                />

            </Stack>
        </View>
    )
}

export default PlaylistScreenLayout