import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { popularDestinations } from "@/constants/DestinationsInfo";

const TravelDetailPage = () => {
  const { id } = useLocalSearchParams();

  const openGoogleMaps = (PLACE_NAME: string) => {
    //Örtülüintent örnek
    const url = `https://www.google.com/maps/search/${PLACE_NAME}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Google Maps:", err)
    );
  };

  const destination = popularDestinations.find(
    (item) => item.id.toString() === id
  );

  if (!destination) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={destination.img} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{destination.name}</Text>
        <Text style={styles.id}>Travel ID: {id}</Text>
        <Text style={styles.rating}>Rating: {destination.rating} ⭐</Text>
        <Text style={styles.description}>{destination.description}</Text>
        {destination.places && destination.places.length > 0 && (
          <View style={styles.placesSection}>
            <Text style={styles.placesTitle}>Places to Visit:</Text>
            {destination.places.map((place, index) => (
              <View key={index} style={styles.placeItem}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeDescription}>{place.description}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.button}
              onPress={() => openGoogleMaps(destination.name)}
            >
              <MaterialCommunityIcons
                name="google-maps"
                size={24}
                color="white"
              />
              <Text style={styles.buttonText}>Open In Google Maps</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  id: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: "#ffa500",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  placesSection: {
    marginTop: 20,
  },
  placesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  placeItem: {
    marginBottom: 15,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  placeDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TravelDetailPage;
