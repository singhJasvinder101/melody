import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute, useRouter } from 'react-native-auto-route';

const Unmatched = () => {
    const route = useRoute()
    console.log(route)
    return (
        <View style={styles.container}>
            <Text>Page Not</Text>
        </View>
    );
};

export default Unmatched;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
