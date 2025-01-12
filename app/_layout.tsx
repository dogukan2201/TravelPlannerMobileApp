import { useFonts } from "expo-font"; // Importing the custom font loading hook from Expo
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
      {/* Yerleri saran ve heryerden ulaşma sansı veren DestinationProvider  */}
      <TodoProvider>
        <Stack>
          {/* Stack bileşeni  birden fazla ekranın yönetilmesini sağlayan bir navigasyon konteyneridir */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          {/* 'travel/index' ekranı, başlık olarak "Travel Planner" gösteriliyor */}
          <Stack.Screen
            name="travel/index"
            options={{
              headerShown: true,
              headerTitle: "Travel Planner",
            }}
          />
          {/* 'travel/[id]' ekranı, dinamik bir ID içeren seyahat detayları */}
          <Stack.Screen
            name="travel/[id]"
            options={{ headerShown: true, headerTitle: "Travel Detail" }}
          />
          {/* 'travel/newDestination' ekranı, yeni bir destinasyon eklemek için */}
          <Stack.Screen
            name="travel/newDestination"
            options={{ headerShown: true, headerTitle: "New Destination" }}
          />
          {/* 'todo/index' ekranı, bir paketleme listesi gösteriyor */}
          <Stack.Screen
            name="todo/index"
            options={{
              headerShown: true,
              headerTitle: "Packing List",
            }}
          />
          {/* 'travel/userDestinations' ekranı, kullanıcıya ait destinasyonları gösteriyor */}
          <Stack.Screen
            name="travel/userDestinations"
            options={{
              headerShown: true,
              headerTitle: "Your Destinations",
            }}
          />
          {/* 'travel/userDestinationDetail/[id]' ekranı, kullanıcıya ait bir destinasyonun detaylarını gösteriyor */}
          <Stack.Screen
            name="travel/userDestinationDetail/[id]"
            options={{
              headerShown: true,
              headerTitle: "Destination Detail",
            }}
          />

          {/* 'todo/[id]' ekranı, belirli bir packing list öğesini düzenlemeye olanak tanıyor */}
          <Stack.Screen
            name="todo/[id]"
            options={{ headerShown: true, headerTitle: "Edit" }}
          />

          {/* 404 veya bulunamayan sayfa için bir placeholder ekran */}
          <Stack.Screen name="+not-found" />
        </Stack>
      </TodoProvider>
    </DestinationProvider>
  );
}
