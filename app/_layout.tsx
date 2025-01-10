import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { TodoProvider } from "@/context";
import { DestinationProvider } from "@/context/DestinationsContext";
import * as ScreenOrientation from "expo-screen-orientation";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    const unlockOrientation = async () => {
      await ScreenOrientation.unlockAsync();
    };
    unlockOrientation();

    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        const orientation = event.orientationInfo.orientation;
        console.log("Current orientation:", orientation);
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <DestinationProvider>
      <TodoProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="travel/index"
            options={{
              headerShown: false,
              headerTitle: "Travel Planner",
            }}
          />
          <Stack.Screen
            name="travel/[id]"
            options={{ headerShown: true, headerTitle: "Travel Detail" }}
          />
          <Stack.Screen
            name="travel/newDestination"
            options={{ headerShown: true, headerTitle: "New Destination" }}
          />
          <Stack.Screen
            name="todo/index"
            options={{
              headerShown: true,
              headerTitle: "Packing List",
            }}
          />
          <Stack.Screen
            name="travel/userDestinations"
            options={{
              headerShown: true,
              headerTitle: "Your Destinations",
            }}
          />
          <Stack.Screen
            name="travel/userDestinationDetail/[id]"
            options={{
              headerShown: true,
              headerTitle: "Destination Detail",
            }}
          />
          <Stack.Screen
            name="todo/[id]"
            options={{ headerShown: true, headerTitle: "Edit" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </TodoProvider>
    </DestinationProvider>
  );
}
