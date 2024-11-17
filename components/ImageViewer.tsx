import { StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type ImageViewerProps = {
  source: ImageSource,
  selected?: string,
};

export default function ImageViewer({ source, selected }: ImageViewerProps) {
  const imageSource = selected ? { uri: selected } : source;
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});