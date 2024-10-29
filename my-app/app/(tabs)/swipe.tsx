import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as MediaLibrary from 'expo-media-library';

const { width } = Dimensions.get('window');

const swipe: React.FC = () => {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const translateX = useSharedValue(0);

  useEffect(() => {
    const fetchAssets = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionGranted(status === 'granted');

      if (status === 'granted') {
        const { assets } = await MediaLibrary.getAssetsAsync({
          first: 20, // Fetch the first 20 images
          mediaType: ['photo'],
        });
        setAssets(assets);
      }
    };

    fetchAssets();
  }, []);

  const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = event.nativeEvent.translationX;
  };

  const handleGestureEnd = () => {
    if (translateX.value < -100 && currentIndex < assets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (translateX.value > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    translateX.value = withSpring(0); // Reset position with spring animation
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (!permissionGranted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera roll. Please grant permission.</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGestureEvent} onEnded={handleGestureEnd}>
        <Animated.View style={[styles.photoContainer, animatedStyle]}>
          {assets.length > 0 && (
            <Image source={{ uri: assets[currentIndex].uri }} style={styles.photo} />
          )}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default swipe;