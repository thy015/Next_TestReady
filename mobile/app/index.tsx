import { View, Image, Text, Dimensions, Pressable } from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation,useRouter, NavigationProp } from 'expo-router';

import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import { P } from '@expo/html-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');

export default function Onboardingg() {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem('onboarded', '1');
    router.replace('/(tabs)/newfeed');
  };
  const navigation = useNavigation<NavigationProp<any>>();
  const onboardingRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

const router = useRouter();
  const onDone= () => {
    router.push('/newfeed/detail');
  };
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handlePress = () => {
    onboardingRef.current?.goToPage(1, true);
    setCurrentPage(1);
  };

  const handlePresss = () => {
    onboardingRef.current?.goToPage(2, true);
    setCurrentPage(2);
  };
  const handlePressss = () => {
    onboardingRef.current?.goToPage(3, true);
    setCurrentPage(3);
  };
  const handlePresssss = () => {
    onboardingRef.current?.goToPage(4, true);
    setCurrentPage(4);
  };
  return (
    <View className="flex-1 bg-white">
      {currentPage !== 0 && currentPage !==4 && (
        <View className="absolute top-20 w-full items-center z-10">
          <Progress.Bar
            progress={(currentPage) / 3}
            color="#1F41BB"
            width={width * 0.8}
            height={width * 0.07}
          />
        </View>
      )}

      <Onboarding
        bottomBarColor="#fff"
        ref={onboardingRef}
        showSkip={true}
        showNext={false}
        flatlistProps={{ scrollEnabled: false }}
        onDone={onDone}
        onPageChange={(index: React.SetStateAction<number>) => setCurrentPage(index)}
        showPagination={false}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image />,
            title: (
              <Pressable
                onPress={handlePress}
                className="bg-blue-50 rounded-xl px-4 py-3 max-w-[100%]"
              >
                <Text className="text-xl text-gray-900">Chào mừng bạn đến với</Text>
                <Text className="text-xl text-center text-gray-900">Goo E-Learning App</Text>
              </Pressable>
            ),
            subtitle: (
              <Pressable onPress={handlePress}>
                <View
                  style={{
                    width: width * 0.9,
                    height: width,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <LottieView
                    source={require('../assets/images/animations/helloscreen.json')}
                    autoPlay
                    loop
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              </Pressable>
            ),
          },
          {
            backgroundColor: '#fff',
            image: <View />,
            title: (
              (
                <OnBoardingStep
                   handlePress={handlePresss}
                   choices={['itube', 'giano', 'fakebuk', 'xxxx']}
                   title="sao ban bit goo z ?"
                 />
               )
            ),
            subtitle: '',
          },
          {
            backgroundColor: '#fff',
            image: <View />,
            title: (
              (
                <OnBoardingStep
                   handlePress={handlePressss}
                   choices={['1p', '1h', '1d', 'toi chet']}
                   title="Ban mun hoc bao nhieu ?"
                 />
               )
            ),
            subtitle: '',
          },
          {
            backgroundColor: '#fff',
            image: <View />,
            title: (
              <OnBoardingStep
                 handlePress={handlePresssss}
                 choices={['1p']}
                 title="cc3m ?"
               />
             ),
            subtitle: '',
          },
          {
            backgroundColor: '#fff',
            image: <View />,
            title: (
              <View
                className="bg-blue-50 rounded-xl px-4 py-3 max-w-[100%]"
              >
                <Text className="text-xl text-gray-900">Vay minh se nhac ban hoc</Text>
                <Text className="text-xl text-center text-gray-900">vao xx gio moi ngay nha !</Text>
              </View>
            ),
            subtitle: (   
              <Pressable onPress={finishOnboarding}>
               <View
              style={{
                width: width * 0.9,
                height: width,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LottieView
                source={require('../assets/images/animations/endonboarding.json')}
                autoPlay
                loop
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            </Pressable>),
          },
        ]}
      />
    </View>
  );
}
type OnBoardingStepProps = {
  handlePress: () => void;
  choices: string[];
  title: string;
};

export const OnBoardingStep: React.FC<OnBoardingStepProps> = ({ handlePress, choices, title }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const handleSelect = (choice: string) => {
    setSelected(choice);
    handlePress();
  };
  return (
    <Pressable onPress={handlePress} className="flex-1 w-full items-center justify-start">
      <View style={{ marginTop: 100 }}>
        <Text className="bg-blue-50 rounded-xl px-4 py-3 max-w-[100%]">
          {title}
        </Text>
      </View>
      <View className="w-full" style={{ marginTop: 70, gap: 20, alignItems: 'center' }}>
        {choices.map((choice) => {
          const isSelected = selected === choice;
          return (
            <Pressable
              key={choice}
              onPress={() => handleSelect(choice)}
              className="w-3/4 max-w-[800px]"
            >
              <Text
                className={`border rounded-xl px-4 py-3 text-center ${
                  isSelected ? 'bg-green-200 border-green-700': 'bg-white border-black'
                }`}
              >
                {choice}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </Pressable>
  );
};