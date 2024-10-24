import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
  imgSource: string;
  selectedImage?: string;
  middlePhoto: boolean;
};

export default function ThumbnailImageViewer({
  imgSource,
  selectedImage,
  middlePhoto,
}: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return (
    <Image
      source={imageSource}
      style={[styles.image, middlePhoto && styles.middleHighlight]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    margin: 3,
    // contentFit
    borderRadius: 3,
  },
  middleHighlight: {
    borderColor: "white",
    borderWidth: 5,
  },
});
