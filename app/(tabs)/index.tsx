import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { type ImageSource } from "expo-image";

const placeholderImage = require("../../assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<ImageSource | undefined>(undefined)
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // pass in an object specifying the ImagePickerOptions:
      mediaTypes: ["images"],
      // allows user to crop image during selection process for both iOS and Android
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };
  const handleStock = () => {
    setSelectedImage(undefined);
    setShowAppOptions(true);
  };
  const handleReset = () => {
    setShowAppOptions(false);
    setSelectedEmoji(undefined);
  };
  const handleAddSticker = () => {
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  }
  const handleSave = () => {};

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer source={placeholderImage} selected={selectedImage} />
        {selectedEmoji && (
          <EmojiSticker imageSize={50} source={selectedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton label="Reset" icon="refresh" onPress={handleReset} />
            <CircleButton onPress={handleAddSticker} />
            <IconButton label="Save" icon="save-alt" onPress={handleSave} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button label="Use stock photo" onPress={handleStock} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={handleModalClose} >
        <EmojiList onSelect={setSelectedEmoji} onCloseModal={handleModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  text: {
    color: "#fff",
  },
  imageContainer: {
    flex: 1,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
