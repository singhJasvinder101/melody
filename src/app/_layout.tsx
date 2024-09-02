import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useCallback, useEffect } from 'react';
import { Stack, useRouter } from 'react-native-auto-route';
import { useSetupTrackPlayer } from '../hooks/useSetupTrackPlayer';
import { useLogTrackPlayerState } from '../hooks/useLogTrackPlayer';
import { Button, View } from 'react-native';
import DismissPlayerButton from '../components/DismissPlayerButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const _layout = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className='flex-1'>
        <RootNavigation />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const RootNavigation = () => {
  const handleTrackPlayerLoaded = useCallback(() => {
    console.log('track player loaded');
  }, []);
  const router = useRouter();

  useSetupTrackPlayer({ onLoad: handleTrackPlayerLoaded });
  useLogTrackPlayerState();


  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="player" options={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
          headerShown: false,
          animationDuration: 400,
          // headerTitle: '',
          // headerBackVisible: false,
          // headerBackground: () => <View className='bg-transparent flex-1' />,
          // headerRight: () => <DismissPlayerButton />,
          // headerTitleAlign: 'center',
        }} />
      </Stack>
      <Stack.Screen name='addToPlaylist'
        options={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
          headerShown: false,
          animationDuration: 400,
      }}
      />
    </>
  );
};

export default _layout;
