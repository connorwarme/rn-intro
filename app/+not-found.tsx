import { View, Text, StyleSheet } from "react-native";
import { Stack, Link } from "expo-router";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View style={styles.container}>
        <Text style={styles.text}>Not Found Screen</Text>
        <Link href="/" style={styles.button}>
          Return to home page
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  text: {
    color: "#fff",
  },
  button: {
    color: "#fff",
    backgroundColor: "red",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
});

export default NotFoundScreen;
