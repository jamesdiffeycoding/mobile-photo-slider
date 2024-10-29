import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

interface PhotoAsset {
  id: string;
  uri: string;
}


const experiment: React.FC = () => {
    const [photos, setPhotos] = useState<PhotoAsset[]>([]);
    const [permission, setPermission] = useState<boolean | null>(null);
    const [count, setCount] = useState<number>(0);
  
    // Request permission to access media library
    useEffect(() => {
      const requestPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        setPermission(status === 'granted');
      };
  
      requestPermission();
    }, []);


  
    // Fetch photos from the camera roll
    const fetchPhotos = async () => {
      if (permission) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          first: 10, // Number of photos to fetch
          mediaType: ['photo'], // Specify media type
        });
        setPhotos(assets as PhotoAsset[]); // Cast assets to PhotoAsset[]
      }
    };

    useEffect(() => {
      const getAssetCount = async () => {
        if (permission) {
          const assetCount = await MediaLibrary.getAssetsAsync({
            mediaType: ['photo'],
          });
          setCount(assetCount.totalCount);
        }
      };
  
      getAssetCount();
    }, [permission]);

//   console.log(photos);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Camera Roll Photos</Text>
        <Text>You have {count} photos </Text>
        <Button title="Load Photos" onPress={fetchPhotos} />
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.image} />
          )}
        />
      </View>
    );
}

export default experiment

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    image: {
      width: 100,
      height: 100,
      margin: 5,
    },
  });