import { Stack } from 'react-native-auto-route'
import { View } from 'react-native'
import { colors } from '../../../constants'
import { defaultStyles } from '../../../../styles'

const ArtistsScreenLayout = () => {
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
                        headerTitle: 'Artists',
                    }}
                />

            </Stack>
        </View>
    )
}

export default ArtistsScreenLayout