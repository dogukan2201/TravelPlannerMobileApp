import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useTodos } from "@/context";
import type { Todo } from "@/context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface TodoListProps {
  data: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ data }) => {
  const { removeTodo } = useTodos();
  const router = useRouter();

  const handlePress = (id: number) => {
    router.push(`/todo/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/todo/${id}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Pressable
              onPress={() => handlePress(item.id)}
              style={styles.itemPressable}
            >
              <Text style={styles.itemText}>{item.title}</Text>
            </Pressable>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                onPress={() => handleEdit(item.id)}
                style={styles.iconButton}
              >
                <MaterialCommunityIcons
                  name="pencil-circle"
                  size={33}
                  color="#4169E1"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeTodo(item.id)}
                style={styles.iconButton}
              >
                <AntDesign name="minuscircle" size={28} color="#FF6347" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "#F0F8FF",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemPressable: {
    flex: 1,
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333333",
  },
  actionContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  iconButton: {
    padding: 4,
  },
});
