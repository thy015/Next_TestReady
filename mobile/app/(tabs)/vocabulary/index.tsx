import React from 'react';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
  {
    id: '1',
    title: 'Childhood',
    subtitle: '1. Thời thơ ấu',
    image: 'https://viewthroughmywindow.com/wp-content/uploads/2021/03/childhood.jpg', 
  },
  {
    id: '2',
    title: 'Relationships',
    subtitle: '2. Các mối quan hệ',
    image: 'https://community.thriveglobal.com/wp-content/uploads/2018/05/manage-work-relationship.jpg',
  },
  {
    id: '3',
    title: 'Family',
    subtitle: '3. Gia đình',
    image: 'https://www.anhngu.usc.edu.vn/Data/Sites/1/News/4358/ielts-speaking-topic-family.jpg',
  },
  {
    id: '4',
    title: 'Growing up P1',
    subtitle: '4. Quá trình trưởng thành',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXOW2Ij1fg4EtuSR1kIxvKci-jAxU2cy8wiw&s',
  },
];

const App = () => {

  const renderItem = ({ item }) => (
    <View className="flex-row bg-white rounded-lg mb-2.5 p-4 items-center shadow-sm">
      <Image source={{ uri: item.image }} className="w-16 h-16 rounded-full mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">{item.title}</Text>
        <Text className="text-sm text-gray-500 mt-0.5">{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-white p-4 items-center border-b border-gray-300">
        <Text className="text-xl font-bold">TOEIC CƠ BẢN</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-2.5"
      />
    </SafeAreaView>
  );
};

export default App;