import { View, StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type StickerProps = {
  imageSize: number;
  source: ImageSource;
};

export default function EmojiSticker({ imageSize, source }: StickerProps) {
  return (
    <View style={styles.container}>
      <Image source={source} style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -350,
  }
});