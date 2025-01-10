import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useDestinationContext } from "@/context/DestinationsContext";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { EditDestinationModal } from "@/components/EditDestinationModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

const UserDestinationDetail = () => {
  const { id } = useLocalSearchParams();
  const { destinations } = useDestinationContext();
  const [editModal, setEditModal] = useState(false);
  const destination = destinations.find((item) => item.id === Number(id));
  const openGoogleMaps = (PLACE_NAME: string) => {
    const url = `https://www.google.com/maps/search/${PLACE_NAME}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Google Maps:", err)
    );
  };
  if (!destination) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={64} color="#ff3b30" />
        <Text style={styles.errorText}>Destination not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      {destination.img && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: destination.img }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.gradient}
          />
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{destination.name}</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={20} color="#4a4a4a" />
            <Text style={styles.subtitle}>{destination.country}</Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  destination.status === "Upcoming"
                    ? "#4CAF50"
                    : destination.status === "Past"
                    ? "tomato"
                    : "#2196F3",
              },
            ]}
          >
            <Text style={styles.badgeText}>{destination.status}</Text>
          </View>
          <Text style={styles.date}>
            {new Date(destination.date).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditModal(true)}
        >
          <MaterialIcons name="edit" size={20} color="#fff" />
          <Text style={styles.editButtonText}>Edit Destination</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openGoogleMaps(destination.name)}
        >
          <MaterialCommunityIcons name="google-maps" size={24} color="white" />
          <Text style={styles.buttonText}>Open In Google Maps</Text>
        </TouchableOpacity>
        {destination.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{destination.description}</Text>
          </View>
        )}
      </View>
      <EditDestinationModal
        visible={editModal}
        onClose={() => setEditModal(false)}
        destination={destination}
      />
    </ScrollView>
  );
};

export default UserDestinationDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  backIcon: {
    position: "absolute",
    top: 44,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  shareIcon: {
    position: "absolute",
    top: 44,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#4a4a4a",
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  date: {
    fontSize: 14,
    color: "#6a6a6a",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  descriptionContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#6a6a6a",
  },
  errorContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#ff3b30",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
