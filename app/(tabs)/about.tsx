import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const AboutScreen = () => {
  return ( 
    <View style={styles.container}>
      <Text style={styles.text}>About Screen</Text>
      <Link href="/" style={styles.button}>Return to home page</Link>
    </View>
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
  button: {
    color: "#fff",
    backgroundColor: "#61dafb",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
});
 
export default AboutScreen;