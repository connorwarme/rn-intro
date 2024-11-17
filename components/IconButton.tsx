import { Pressable, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type IconButtonProps = {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress?: () => void;
};

export default function IconButton({ label, icon, onPress }: IconButtonProps) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconLabel: {
    color: "#fff",
    marginTop: 12,
  },
});