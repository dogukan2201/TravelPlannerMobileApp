import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTodos } from "@/context";

const EditScreen = () => {
  const { id } = useLocalSearchParams();
  const { todos, updateTodo } = useTodos();
  const router = useRouter();
  const [editedTitle, setEditedTitle] = useState("");

  const todo = todos.find((todo) => todo.id.toString() === id);

  useEffect(() => {
    if (todo) {
      setEditedTitle(todo.title);
    }
  }, [todo]);

  const handleUpdate = () => {
    if (todo) {
      updateTodo(todo.id, editedTitle);
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Edit Travel Packing Item</Text>
        {todo ? (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholder="Edit item title"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noTodoText}>No Item Found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  noTodoText: {
    fontSize: 18,
    color: "#888",
  },
});
