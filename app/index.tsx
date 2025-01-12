import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const router = useRouter();

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Font yüklenemedi</Text>
      </SafeAreaView>
    );
  }

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View
        style={[
          styles.content,
          { flexDirection: isLandscape ? "row" : "column" },
        ]}
      >
        <Text style={[styles.title, isLandscape && styles.landscapeTitle]}>
          Welcome to
        </Text>
        <Text style={[styles.title, isLandscape && styles.landscapeTitle]}>
          Travel Planner
        </Text>
        {!isLandscape && (
          <Text style={styles.subtitle}>Your journey begins here</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/travel"); //Expo Router ile sayfa yönlendirme yapıldı.
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Inter_600SemiBold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  landscapeTitle: {
    fontSize: 24,
    marginHorizontal: 10,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Inter_400Regular",
    color: "#64748B",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default HomeScreen;
