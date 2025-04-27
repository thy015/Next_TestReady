import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Text } from 'react-native';
export default function HomeScreen() {
  return (
     <ThemedView className="flex items-center relative w-full h-fit mt-3">
        <Text className="text-6xl mt-6">
          Goo
        </Text>
        <Text className="text-3xl mt-2">
          English Learning App
        </Text>
      </ThemedView>
  );
}

