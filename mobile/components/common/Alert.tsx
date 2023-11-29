import { View, Text } from 'react-native';
import React from 'react';

export interface AlertProps {
  alertType: 'good' | 'warning' | 'danger';
  children: React.ReactNode;
  className?: string;
}

export default function Alert({ alertType, children, className }: AlertProps) {
  return (
    <View
      style={{
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
          alertType === 'good'
            ? 'rgba(16, 185, 129, 0.2)'
            : alertType === 'warning'
            ? 'rgba(255, 165, 0, 0.2)'
            : alertType === 'danger'
            ? 'rgba(220, 38, 38, 0.2)'
            : '',
      }}>
      <Text style={{ color: '#FFFFFF', fontWeight: '400' }}>{children}</Text>
    </View>
  );
}
