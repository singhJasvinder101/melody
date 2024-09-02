import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { colors, fontSize } from './index';

export const StackScreenSearch: NativeStackNavigationOptions = {
    headerStyle: { backgroundColor: "black" },
    headerTitleStyle: {
        color: colors.text,
        fontSize: 30,
    },
    freezeOnBlur: true,
    headerTitleAlign: 'left',
    headerTintColor: colors.text,
    headerTransparent: true,
    headerShadowVisible: false,
};

export const TabsScreen: BottomTabNavigationOptions = {
    tabBarStyle: {
        backgroundColor: 'black',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 0,
        height: 60,
        position: 'absolute',
        bottom: 0,
    },
    tabBarLabelStyle: {
        color: colors.text,
        fontSize: fontSize.xs,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    tabBarActiveTintColor: colors.primary,
    tabBarIconStyle: {
    },
    tabBarLabelPosition: 'below-icon',
    tabBarShowLabel: true,
};