import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'react-native-auto-route';

const DismissPlayerButton = () => {
    const router = useRouter();

    return (
        <View className='my-5'>
            <TouchableOpacity
                onPress={() => router.back()}
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DismissPlayerButton;
