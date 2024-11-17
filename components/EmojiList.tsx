import { FlatList, Platform, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { Image, type ImageSource } from "expo-image";

interface EmojiListProps {
  onSelect: (image: ImageSource) => void;
  onCloseModal: () => void;
}

export default function EmojiList({ onSelect, onCloseModal }: EmojiListProps) {
  const [emoji] = useState<ImageSource[]>([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      contentContainerStyle={styles.listContainer}
      data={emoji}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
          key={index}
        >
          <Image source={item} key={index} style={styles.emoji} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emoji: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
