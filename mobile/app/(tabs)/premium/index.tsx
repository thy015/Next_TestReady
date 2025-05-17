import { View, Text,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function index() {
  return (
    <View>
  <SafeAreaView className='justify-center items-center bg-gray-100'>
    <View className='flex-row justify-between p-4 w-[90%] bg-blue-600 border-spacing-0.5 border-black rounded-lg shadow-md'>
      <View>
      <Text className='text-white'>index</Text>
      <Text className='text-white'>index</Text>
      </View>
      <View>
      <Text className='text-white'>icon</Text>
      </View>
    </View>
  
    <View className="h-[1px] bg-black my-3" />
   <View className="bg-blue-600 rounded-xl shadow-lg p-4 w-[90%] flex-row justify-between relative">
    <View className="space-y-1 flex-1 pr-2">
  <Text className="text-white font-bold text-lg">Let's Goo / 1 year</Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">Unlimited lessons</Text></Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">Unlimited reading</Text></Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">Unlimited likes</Text></Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">No ads</Text></Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">Offline</Text></Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">Unlimited note-taking</Text></Text>

  <View className="bg-white px-4 py-1 ml-5 w-[70%] rounded-full flex-row justify-center mt-2 self-center">
    <Text className="text-gray-500 line-through mr-2">650.000</Text>
    <Text className="text-black font-semibold">499.000</Text>
  </View>
</View>

      <View className="relative">
        <Image
          source={{ uri: 'https://i1.sndcdn.com/artworks-1dU3He5UYVQIJz4W-sptuYQ-t240x240.jpg' }}
          className="w-16 h-16 rounded-full"
        />
        <View className="absolute -top-1 -right-1 bg-purple-500 rounded-full w-5 h-5 items-center justify-center">
          <Text className="text-yellow-300 text-xs">★</Text>
        </View>
      </View>
    </View>
     <View className="bg-blue-600 rounded-xl shadow-lg p-4 w-[90%] flex-row justify-between relative mt-4">
    <View className="space-y-1 flex-1 pr-2">
  <Text className="text-white font-bold text-lg">Let's Goo / 1 year</Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">Unlimited lessons</Text></Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">Unlimited reading</Text></Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">Unlimited likes</Text></Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">No ads</Text></Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">Offline</Text></Text>
  <Text className="text-white text-sm">✔️ <Text className="text-white/80">Unlimited note-taking</Text></Text>

  <View className="bg-white px-4 py-1 ml-5 w-[70%] rounded-full flex-row justify-center mt-2 self-center">
    <Text className="text-gray-500 line-through mr-2">650.000</Text>
    <Text className="text-black font-semibold">499.000</Text>
  </View>
</View>

      <View className="relative">
        <Image
          source={{ uri: 'https://i1.sndcdn.com/artworks-1dU3He5UYVQIJz4W-sptuYQ-t240x240.jpg' }}
          className="w-16 h-16 rounded-full"
        />
        <View className="absolute -top-1 -right-1 bg-purple-500 rounded-full w-5 h-5 items-center justify-center">
          <Text className="text-yellow-300 text-xs">★</Text>
        </View>
      </View>
    </View>
    </SafeAreaView>
</View>
  )
}