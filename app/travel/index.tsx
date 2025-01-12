import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { popularDestinations, Destination } from "@/constants/DestinationsInfo";

const TravelPlannerScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handlePress = (id: number) => {
    router.push(`/travel/${id}`);
  };

  const filteredDestinations = useMemo(() => {
    // 'filteredDestinations' değişkeni, popüler destinasyonları arama sorgusuna göre filtreler
    return popularDestinations.filter((item) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        item.country.toLowerCase().includes(searchLower) ||
        item.name.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]); // 'searchQuery' değiştiğinde yeniden hesaplanır

  const renderDestinationItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      style={styles.destinationItem}
      onPress={() => handlePress(item.id)}
    >
      <Image source={item.img} style={styles.destinationImage} />
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationCountry}>{item.country}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Travel Planner</Text>
            <TouchableOpacity
              style={styles.todoButton}
              onPress={() => router.push("/travel/userDestinations")}
            >
              <View style={styles.todoButtonContent}>
                <MaterialIcons name="card-travel" size={24} color="white" />
                <Text style={styles.todoButtonText}>Your Destinations</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={24}
            color="#A0A0A0"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            placeholder="Search destinations or countries"
            onChangeText={setSearchQuery}
            placeholderTextColor="#A0A0A0"
          />
        </View>
        <Text style={styles.sectionTitle}>
          {searchQuery ? "Search Results" : "Popular Destinations"}
        </Text>
        <FlatList
          data={filteredDestinations}
          renderItem={renderDestinationItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  headerContent: {
    flexDirection: "column",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333333",
  },
  todoButton: {
    backgroundColor: "#453f3f",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 36,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  todoButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  todoButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333333",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  destinationItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  destinationImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  destinationInfo: {
    padding: 15,
  },
  destinationName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  destinationCountry: {
    fontSize: 16,
    color: "#666666",
    marginTop: 5,
  },
});

export default TravelPlannerScreen;
