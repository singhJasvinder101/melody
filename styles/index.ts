import { StyleSheet } from 'react-native'
import { colors, fontSize } from '../src/constants'

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    text: {
        fontSize: fontSize.base,
        color: colors.text,
    },
})