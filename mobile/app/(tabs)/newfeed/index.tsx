import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

const index = () => {
  const router = useRouter();

  return (
    <ThemedView className="flex-1 bg-white pt-5 pb-10">
      <View className="flex-row justify-end py-2 px-3 space-x-2">
        <View className="bg-white rounded-full border border-black px-3">
          <Text>sort</Text>
        </View>
      </View>
      <ScrollView>
        <View className="m-2 rounded-lg bg-white overflow-hidden relative">
          <View className="w-full aspect-[16/9]">
            <Image
              className="w-full h-full"
              resizeMode="cover"
              source={{
                uri: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
              }}
            />
          </View>
          <Text className="absolute top-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-xs">
            CNN
          </Text>
          <Text className="text-base font-bold p-2">
            Trump's trade war will hit US prosperity hard, IMF warns
          </Text>
          <View className="flex-row justify-between px-2 pb-2 text-gray-700">
            <Text>2 min</Text>
            <Text>👀 319</Text>
            <Text>4/25/25 - 7:30 PM</Text>
          </View>
        </View>

        <Text className="text-xl m-2 font-bold">Hôm nay có gì</Text>
        {[1, 2, 3].map((_, index) => (
          <View
            key={index}
            className="m-2 bg-white overflow-hidden relative border-b-2 border-black/20 pb-2"
          >
            <View className="flex-row">
 
              <View className="flex-[4]">
                <View className="w-full aspect-[4/3]">
                  <Image
                    className="w-full h-full"
                    resizeMode="cover"
                    source={{
                      uri: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
                    }}
                  />
                </View>
                <Text className="absolute top-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-xs">
                  CNN
                </Text>
              </View>

              <View className="flex-[6] p-2 justify-start">
                <Text className="font-bold text-base mb-1">
                  Trump's trade war will hit US prosperity hard, IMF warns
                </Text>
                <Text>Author: Capuccino</Text>
              </View>
            </View>

            <View className="flex-row justify-between px-2 pt-2 text-gray-700">
              <Text>👀 319</Text>
              <Text>4/25/25 - 7:30 PM</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
};
export default index;
