import TodoList from "@/components/TodoList";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { useTodos } from "@/context";
import type { Todo } from "@/context";
import AntDesign from "@expo/vector-icons/AntDesign";

const TravelPackingList = () => {
  const [inputValue, setInputValue] = useState(""); // 'inputValue' durumu, input değerini tutar
  const { addTodo, todos } = useTodos(); // 'addTodo' ve 'todos' değişkenleri, 'useTodos' konteksinden alınır

  const handleAddTodo = () => {
    // 'handleAddTodo' fonksiyonu, yeni bir todo eklemek için kullanılır
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Math.random(),
        title: inputValue,
      };
      addTodo(newTodo); // 'addTodo' fonksiyonu, yeni bir todo ekler
      setInputValue("");
    } else {
      alert("Please enter an item");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Travel Packing List</Text>
        <View style={styles.inputContainer}>
          <TextInput // 'TextInput' bileşeni, kullanıcıdan input almak için kullanılır
            style={styles.input}
            placeholder="Add an Item..."
            placeholderTextColor="#999"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
            <AntDesign name="plus" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <TodoList data={todos} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // 'StyleSheet.create' fonksiyonu, stilleri tanımlamak için kullanılır
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
  },
});

export default TravelPackingList;
