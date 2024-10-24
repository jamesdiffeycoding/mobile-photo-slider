import { View, StyleSheet, /* @tutinfo */ Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import ThumbnailImageViewer from "@/components/ThumbnailImageViewer";
const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Sort() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [status, requestPermission] = MediaLibrary.usePermissions();
  // const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <>
      <View style={styles.page}>
        {/* TOP IMAGES */}
        <View style={styles.thumbnailBar}>
          <ThumbnailImageViewer
            imgSource={PlaceholderImage}
            selectedImage={selectedImage}
            middlePhoto={false}
          />
          <ThumbnailImageViewer
            imgSource={PlaceholderImage}
            selectedImage={selectedImage}
            middlePhoto={false}
          />{" "}
          <ThumbnailImageViewer
            imgSource={PlaceholderImage}
            selectedImage={selectedImage}
            middlePhoto={true}
          />{" "}
          <ThumbnailImageViewer
            imgSource={PlaceholderImage}
            selectedImage={selectedImage}
            middlePhoto={false}
          />
          <ThumbnailImageViewer
            imgSource={PlaceholderImage}
            selectedImage={selectedImage}
            middlePhoto={false}
          />
        </View>

        {/* MAIN PHOTO */}
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        ></ImageViewer>

        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Jump to start"
            onPress={pickImageAsync}
          />
          <Button
            theme="primary"
            label="Choose photo"
            onPress={pickImageAsync}
          />
          <Button
            theme="primary"
            label="Jump to end"
            onPress={pickImageAsync}
          />
        </View>
      </View>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#25222e",
    alignItems: "center",
  },
  thumbnailBar: {
    flexDirection: "row",
    // width: "30px",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
