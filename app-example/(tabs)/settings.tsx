import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, ImageBackground, View, Text, ScrollView, Button, Pressable, Modal, StatusBar, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
const logoImg = require("@/assets/images/partial-react-logo.png");

export default function settingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [animating, setAnimating] = useState(false);
  return (
    <ScrollView>
    <StatusBar barStyle="dark-content" hidden={!showStatus} />
    <View style={[styles.box, {backgroundColor: "rgba(0,0,0,0.5)"}, styles.boxShadow]}>
      <Text style={{color: "white"}}>Styles are <Text style={{fontWeight: "bold"}}>in bold.</Text></Text>
    </View>
    <View style={{ flex: 1, backgroundColor: "lightblue", padding: 60 }}>
      <Button title="Open Modal" onPress={() => setModalVisible(true)} />
      <Button title="Toggle Status Bar" onPress={() => setShowStatus(!showStatus)} />
      <ActivityIndicator size="large" color="red" animating={animating} />
      <Button title="Toggle Animating" onPress={() => setAnimating(!animating)}></Button>
      <Button title="Show Alert" onPress={() => Alert.alert("Invalid Data!", "Email was not a valid address", [
        {
          text: "Cancel",
          onPress: () => console.log('cancel pressed')
        },
        {
          text: "OK",
          onPress: () => console.log('okay pressed')
        }
      ])} />
    </View>
    <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType="fade" >
    <View style={{ flex: 1, backgroundColor: "plum", padding: 60 }}>
      <Button title="Close Modal" onPress={() => setModalVisible(false)} />
      <Text>
        The replaced content is scaled to maintain its aspect ratio while
        fitting within the element's content box. The entire object is made to
        fill the box, while preserving its aspect ratio, so the object will be
        "letterboxed" or "pillarboxed" if its aspect ratio does not match the
        aspect ratio of the box. cover The replaced content is sized to maintain
        its aspect ratio while filling the element's entire content box. If the
        object's aspect ratio does not match the aspect ratio of its box, then
        the object will be clipped to fit.
        The replaced content is scaled to maintain its aspect ratio while
        fitting within the element's content box. The entire object is made to
        fill the box, while preserving its aspect ratio, so the object will be
        "letterboxed" or "pillarboxed" if its aspect ratio does not match the
        aspect ratio of the box. cover The replaced content is sized to maintain
        its aspect ratio while filling the element's entire content box. If the
        object's aspect ratio does not match the aspect ratio of its box, then
        the object will be clipped to fit.
      </Text>
    </View>
    </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerImage: {
    color: "black",
  },
  imgContainer: {
    flex: 1,
  },
  logoImage: {
    width: 300,
    height: 300,
    // objectFit: 'cover',
    alignSelf: "center",
    marginBottom: 20,
  },
  networkImage: {
    width: 300,
    height: 300,
    objectFit: "cover",
    alignSelf: "center",
    marginBottom: 20,
  },
  bgImage: {
    flex: 1,
  },
  box: {
    backgroundColor: "white",
    height: 200,
    width: 200,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  boxShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  }
});
