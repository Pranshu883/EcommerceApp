import { Image } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import { ONBOARDED, getSession, saveSession } from '../common/LocalStorage';




const OnboardingScreen = ({ navigation }) => {


  useEffect(() => {
    getStorage();
  }, [])
  const getStorage = async () => {
    try {
      const onboardedValue = await getSession(ONBOARDED);
      console.log(onboardedValue);
      if (onboardedValue == "0") {
        // setOnboarded(JSON.parse(onboardedValue));
        // console.log(onboarded);
        navigation.navigate("Onboarding");
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error('Error retrieving onboarding status:', error);
    }
  }

  const onPressFinish = async () => {

    saveSession(ONBOARDED, "1")
    navigation.navigate('Login');
  };

  return (
    <Onboarding
      onDone={onPressFinish}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/EcomImages/onBoardingPage1.jpg')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fe6e58',
          image: <Image source={require('../assets/Images/image2.jpeg')} />,
          title: 'The Title',
          subtitle: 'This is the subtitle that sumplements the title.',
        },
        {
          backgroundColor: '#999',
          image: <Image source={require('../assets/Images/image1.jpeg')} />,
          title: 'Triangle',
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  );

};

export default OnboardingScreen;