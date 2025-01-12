import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import ImagePickerExample from "@/components/ImagePicker";
import DateTimePickerExample from "@/components/DatePicker";
import { Picker } from "@react-native-picker/picker";
import { useDestinationContext } from "@/context/DestinationsContext";
import type { DestinationProps } from "@/context/DestinationsContext";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;

interface DestinationStatus {
  label: string;
  value: "Planning" | "Upcoming" | "Past";
}

const STATUS_OPTIONS: DestinationStatus[] = [
  { label: "Planning", value: "Planning" },
  { label: "Upcoming", value: "Upcoming" },
  { label: "Past", value: "Past" },
];

export default function newDestination() {
  const { addDestination } = useDestinationContext(); // 'addDestination' fonksiyonu, destinasyon eklemek için 'useDestinationContext' konteksinden alınır
  const [showDatePicker, setShowDatePicker] = useState(false); // 'showDatePicker' durumu, tarih seçici (DatePicker) görünürlüğünü kontrol eder
  const [formData, setFormData] = useState<DestinationProps>({
    // 'formData' durumu, destinasyon ekleme formunun verilerini tutar
    id: Math.random(),
    name: "",
    country: "",
    status: "Planning",
    date: new Date(),
    img: "",
    description: "",
    places: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    country: "",
  });

  const validateForm = (): boolean => {
    // 'validateForm' fonksiyonu form verilerini doğrulamak için kullanılır
    let isValid = true;
    const newErrors = {
      name: "",
      country: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Destination name is required";
      isValid = false;
    }

    if (!formData.country.trim()) {
      // Eğer ülke boşsa hata mesajı eklenir ve geçerlilik durumu false yapılır
      newErrors.country = "Country is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    // 'handleSubmit' fonksiyonu, form verilerini gönderme ve doğrulama işlemi yapar

    if (!validateForm()) {
      Alert.alert("Error", "Please fix the errors in the form");
      return;
    }
    // Yeni destinasyon formdaki veriler ile oluşturulu
    const newDestination: DestinationProps = {
      id: Math.random(),
      name: formData.name,
      country: formData.country,
      status: formData.status,
      date: formData.date,
      img: formData.img,
      description: formData.description,
      places: formData.places,
    };

    addDestination(newDestination); // Yeni destinasyon, 'addDestination' fonksiyonu ile eklenir
    router.push("/travel/userDestinations");

    // Form sıfırlanır
    setFormData({
      id: Math.random(),
      name: "",
      country: "",
      status: "Planning",
      date: new Date(),
      img: "",
      description: "",
      places: [],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Add New Destination</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Destination Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="e.g., Bee Coffee"
            value={formData.name}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, name: text }))
            }
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={[styles.input, errors.country && styles.inputError]}
            placeholder="e.g., France"
            value={formData.country}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, country: text }))
            }
          />
          {errors.country ? (
            <Text style={styles.errorText}>{errors.country}</Text>
          ) : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  status: value,
                }))
              }
              style={styles.picker}
            >
              {STATUS_OPTIONS.map((status) => (
                <Picker.Item
                  key={status.value}
                  label={status.label}
                  value={status.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {formData.date.toDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePickerExample
              date={formData.date}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setFormData((prev) => ({
                    ...prev,
                    date: selectedDate,
                  }));
                }
              }}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Place Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={formData.description}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, description: text }))
            }
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Image URL</Text>
          <ImagePickerExample
            image={formData.img}
            setImage={(img) =>
              setFormData((prev) => ({
                ...prev,
                img,
              }))
            }
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Add Destination</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1a1a1a",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#4a4a4a",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  picker: {
    height: 50,
  },
  dateButton: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#4a4a4a",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
