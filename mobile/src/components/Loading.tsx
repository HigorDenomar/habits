import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#09090A',
      }}
    >
      <ActivityIndicator color='#7C3AED' />
    </View>
  );
}
