import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DestinationProps,
  useDestinationContext,
} from "@/context/DestinationsContext";

interface EditDestinationModalProps {
  visible: boolean;
  onClose: () => void;
  destination: DestinationProps;
}

export const EditDestinationModal = ({
  visible,
  onClose,
  destination,
}: EditDestinationModalProps) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { updateDestination } = useDestinationContext();
  const [form, setForm] = useState({
    id: destination.id,
    name: destination.name,
    country: destination.country,
    description: destination.description || "",
    date: new Date(destination.date),
    status: destination.status,
  });

  const handleSave = () => {
    try {
      updateDestination(destination.id, form);
      onClose();
    } catch (error) {
      console.error("Error updating destination:", error);
      alert("An error occurred while saving. Please try again.");
    }
  };

  const statusOptions = ["Upcoming", "Past", "Planning"];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Destination</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={(text) => {
                  setForm((prev) => ({ ...prev, name: text }));
                }}
                placeholder="Destination name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                value={form.country}
                onChangeText={(text) => {
                  setForm((prev) => ({ ...prev, country: text }));
                }}
                placeholder="Country"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={form.description}
                onChangeText={(text) => {
                  setForm((prev) => ({ ...prev, description: text }));
                }}
                placeholder="Description"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{form.date.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.statusContainer}>
                {statusOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.statusOption,
                      form.status === option && {
                        backgroundColor:
                          form.status === "Upcoming"
                            ? "#4CAF50"
                            : form.status === "Past"
                            ? "tomato"
                            : "#2196F3",
                      },
                    ]}
                    onPress={() =>
                      setForm((prev) => ({
                        ...prev,
                        status: option as DestinationProps["status"],
                      }))
                    }
                  >
                    <Text
                      style={[
                        styles.statusText,
                        form.status === option && {
                          color: "#fff",
                          fontWeight:
                            form.status === option ? "bold" : "normal",
                        },
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={destination.date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setForm((prev) => ({ ...prev, date: selectedDate }));
                }
              }}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
  },
  statusContainer: {
    flexDirection: "row",
    gap: 10,
  },
  statusOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  statusOptionSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  statusText: {
    color: "#1a1a1a",
  },
  statusTextSelected: {
    color: "#fff",
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
