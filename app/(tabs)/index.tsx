import { View, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useState, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

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
  const [selectedEmoji, setSelectedEmoji] = useState<ImageSource | undefined>(
    undefined
  );
  // checks if there's permission to access the media library. if status is null, request permission (see below)
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  if (status === null) {
    // use requestPermission method to request permission to access media library (to save image)
    requestPermission();
  }
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
  };
  const handleSave = async () => {
    if (Platform.OS !== "web") {
      try {
        // captureRef method takes a ref and options object as arguments
        // returns a promise that resolves to a URI string
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        // saveToLibraryAsync method takes a URI string as an argument
        // saves the image to the media library
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer source={placeholderImage} selected={selectedImage} />
          {selectedEmoji && (
            <EmojiSticker imageSize={50} source={selectedEmoji} />
          )}
        </View>
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
      <EmojiPicker isVisible={isModalVisible} onClose={handleModalClose}>
        <EmojiList
          onSelect={setSelectedEmoji}
          onCloseModal={handleModalClose}
        />
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
