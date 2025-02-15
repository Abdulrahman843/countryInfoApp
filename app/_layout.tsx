import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Layout() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* Home Screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "🌍 Country Explorer",
        }}
      />

      {/* Country Details Screen */}
      <Stack.Screen
        name="country/[name]"
        options={{
          title: "Country Details",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingHorizontal: 10 }}
            >
              <Text style={{ color: "#000" }}>⬅ Back</Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* Explore Screen */}
      <Stack.Screen
        name="explore"
        options={{
          title: "Explore Countries",
        }}
      />
    </Stack>
  );
}
