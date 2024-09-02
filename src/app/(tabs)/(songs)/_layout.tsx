import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'react-native-auto-route'
import { defaultStyles } from '../../../../styles'

const SongsScreenLayout = () => {
  return (
    <View className='flex-1 bg-white'>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen
          name='index'
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </View>
  )
}

export default SongsScreenLayout