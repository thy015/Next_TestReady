import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
const data = [
  {
    id:'1',
    icon: 'sync-circle-outline',
    title: 'Chế độ tối',
    color:'gray'
  },
  {
    id:'2',
    icon: 'language-outline',
    title: 'Đổi ngôn ngữ',
  color:'green'
  },
  {
    id:'3',
    icon: 'school-outline',
    title: 'Hẹn giờ nha ku kem',
    color:'orange'
  },
  {
    id:'4',
    icon: 'flag-outline',
    title: 'Đặt mục tiêu',
    color:'cyan'
  },
];
export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <TouchableOpacity className="flex-row items-center bg-white rounded-lg p-4 m-4 shadow">
        <Ionicons name="person-circle-outline" size={40} color="gray" />
        <Text className="flex-1 text-blue-600 text-lg font-semibold ml-4">Đăng nhập</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </TouchableOpacity>

      <View className="m-4">
        <Text className="text-xl font-bold mb-4">Cài đặt</Text>
{data.map((item) => (
          <TouchableOpacity key={item.id} className="flex-row items-center bg-white rounded-lg p-4 mb-2 shadow">
            <Ionicons name={item.icon as any} size={30} color={item.color} />
            <Text className="flex-1 text-lg ml-4">{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>
        ))}
        
      </View>
    </SafeAreaView>
  );
}
const adu = () => {


}