import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Modal,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { useDestinationContext } from "@/context/DestinationsContext";
import type { DestinationProps } from "@/context/DestinationsContext";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 16;
const CARD_WIDTH = width - CARD_MARGIN * 2;

const UserDestinations = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filters = ["All", "Upcoming", "Past", "Planning"];
  const { destinations, removeDestination } = useDestinationContext();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const handleAddDestination = () => {
    router.push("/travel/newDestination");
  };
  const handleDeleteDestination = (id: number) => {
    setDeleteAlert(true);
    try {
      removeDestination(id);
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  const renderDestinationCard = ({ item }: { item: DestinationProps }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => router.push(`/travel/userDestinationDetail/${item.id}`)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.destinationName}>{item.name}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === "Upcoming"
                    ? "#4CAF50"
                    : item.status === "Past"
                    ? "#FF5252"
                    : "#2196F3",
              },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="public" size={18} color="#666" />
            <Text style={styles.detailText}>{item.country}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={18} color="#666" />
            <Text style={styles.detailText}>
              {item.date.toString().slice(0, 15)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            setSelectedId(item.id);
            setDeleteAlert(true);
          }}
          activeOpacity={0.7}
        >
          <MaterialIcons name="delete-outline" size={24} color="#FF5252" />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
  const renderFilterChip = (filter: string) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterChip,
        selectedFilter === filter && styles.selectedFilterChip,
      ]}
      onPress={() => setSelectedFilter(filter)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === filter && styles.selectedFilterText,
        ]}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );

  const filteredDestinations = destinations.filter((destination) => {
    if (selectedFilter === "All") return true;
    return destination.status === selectedFilter;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Destinations</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddDestination}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <FontAwesome5 name="calendar-plus" size={20} color="white" />
          <Text style={styles.buttonText}>Add New Destination</Text>
        </View>
      </TouchableOpacity>
      {destinations.length === 0 ? (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>You Don't have any destinations</Text>
        </View>
      ) : (
        <View style={styles.filtersContainer}>
          <FlatList
            horizontal
            data={filters}
            renderItem={({ item }) => renderFilterChip(item)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>
      )}

      <FlatList
        data={filteredDestinations}
        renderItem={renderDestinationCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.destinationsList}
      />
      <Modal
        visible={deleteAlert}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeleteAlert(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setDeleteAlert(false)}>
                <Text style={styles.modalButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteDestination(selectedId);
                  setDeleteAlert(false);
                }}
              >
                <Text style={styles.modalButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[styles.addButton, styles.packingListButton]}
        onPress={() => router.push("/todo/")}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <Entypo name="list" size={20} color="white" />
          <Text style={styles.buttonText}>Travel Packing List</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight,
  },
  error: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    marginHorizontal: 16,
    color: "#FF5252",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
    marginHorizontal: 16,
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersList: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedFilterChip: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  filterText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedFilterText: {
    color: "#FFF",
  },
  destinationsList: {
    padding: 16,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  destinationName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  cardDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 15,
    color: "#666",
    flex: 1,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  deleteText: {
    color: "#FF5252",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  addButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#2196F3",
    borderRadius: 12,
    paddingVertical: 14,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  packingListButton: {
    backgroundColor: "#4CAF50",
    marginTop: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Arka plan karartma
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    marginVertical: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    fontSize: 16,
    color: "#FF5252",
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UserDestinations;
