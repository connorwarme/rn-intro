import { View, StyleSheet } from "react-native";
import { type ImageSource } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type StickerProps = {
  imageSize: number;
  source: ImageSource;
};

export default function EmojiSticker({ imageSize, source }: StickerProps) {
  // useSharedValue hook helps mutate data and run animations based on current .value property
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = withSpring(imageSize * 2);
      } else {
        scaleImage.value = withSpring(imageSize);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: scaleImage.value,
      width: scaleImage.value,
    };
  });

  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={pan} >
      <Animated.View style={[panStyle, styles.container]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={source}
            resizeMode="contain"
            style={[animatedStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -350,
  },
});
