import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelPosition: 'below-icon',
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          android: {
            position: 'absolute',},
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="newfeed/index"
        options={{
          title: 'Đọc báo',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="vocabulary/index"
        options={{
          title: 'Từ vựng',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="character.book.closed" color={color} />,
        }}
      />
      
<Tabs.Screen
  name="leaderboard/index"
  options={{
    title: 'Khó nói',
    tabBarIcon: ({ color }) => (
      <IconSymbol name="chart.bar.xaxis" size={28} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="premium/index"
  options={{
    title: 'Khó nói',
    tabBarIcon: ({ color }) => (
      <IconSymbol name="crown.fill" size={28} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="explore"
  options={{
    title: 'Cài đặt',
    tabBarIcon: ({ color }) => (
      <IconSymbol name="gearshape.fill" size={28} color={color} />
    ),
  }}
/>
    </Tabs>
  );
}
