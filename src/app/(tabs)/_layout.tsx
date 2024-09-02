import React from 'react';
import { Tabs } from 'react-native-auto-route';
import { colors, fontSize } from '../../constants';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Icon } from '../../lib/Icons';
import { BlurView } from '@react-native-community/blur';
import FloatingPlayer from '../../components/FloatingPlayer';

const _layout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: colors.primary,
                    tabBarLabelStyle: {
                        fontSize: fontSize.xs,
                        fontWeight: '500',
                    },
                    headerShown: false,
                    tabBarStyle: {
                        position: 'absolute',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderTopWidth: 0,
                        height: 70,
                        bottom: 0,
                        paddingBottom: 6,
                        paddingTop: 3,
                    },
                    // tabBarBackground: () => (
                    //     <View
                    //         style={{
                    //             ...StyleSheet.absoluteFillObject,
                    //             borderTopLeftRadius: 20,
                    //             borderTopRightRadius: 20,
                    //             overflow: "hidden"
                    //         }}
                    //     >
                    //         <BlurView
                    //             style={{ flex: 1, backgroundColor: 'transparent' }}
                    //             blurType='light'
                    //             blurAmount={40}
                    //         />
                    //     </View>
                    // ),
                }}
            >
                <Tabs.Screen
                    name='(songs)'
                    options={{
                        title: 'Songs',
                        headerShown: false,
                        tabBarIcon: ({ color }) => <Icon iconName="music" size={20} color={color} />,
                    }}
                />

                <Tabs.Screen
                    name='(playlists)'
                    options={{
                        title: 'Playlists',
                        headerShown: false,
                        tabBarIcon: ({ color }) => <Icon iconName="playlist" size={20} color={color} />,
                    }}

                />
                <Tabs.Screen
                    name='favorites'
                    options={{
                        title: 'Favorites',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Icon iconName='heart' size={24} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name='(artists)'
                    options={{
                        title: 'Artists',  
                        headerShown: false,
                        tabBarIcon: ({ color }) => <Icon iconName="artists" size={20} color={color} />,
                    }}
                />
            </Tabs>
            <FloatingPlayer
                style={{
                    position: 'absolute',
                    left: 8,
                    right: 8,
                    bottom: 78,
                }}
            />
        </>
    )
}

export default _layout
