import { StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type ImageViewerProps = {
  source: ImageSource,
};

export default function ImageViewer({ source }: ImageViewerProps) {
  return <Image source={source} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});