import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchCountryDetails } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CountryData {
  name: { common: string };
  flags: { svg?: string; png?: string };
  capital?: string[];
  population?: number;
  region?: string;
  subregion?: string;
  continents?: string[];
  cca3?: string;
  currencies?: { [key: string]: { name: string } };
  languages?: { [key: string]: string };
  states?: string[];
  government?: { leader?: string };
}

// Function to load theme preference from AsyncStorage
const loadTheme = async () => {
  const savedTheme = await AsyncStorage.getItem("theme");
  return savedTheme === "dark" ? "dark" : "light";
};

export default function CountryDetails() {
  const { name } = useLocalSearchParams();
  const [country, setCountry] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from AsyncStorage when the component mounts
  useEffect(() => {
    const getTheme = async () => {
      const currentTheme = await loadTheme();
      setTheme(currentTheme);
    };
    getTheme();
  }, []);

  // Function to toggle theme and store preference
  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const getCountryDetails = async () => {
      if (!name) {
        setError("Invalid country name.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchCountryDetails(name as string);
        if (data) {
          setCountry(data);
        } else {
          setError("Country details not found.");
        }
      } catch (error) {
        console.error("❌ Error fetching country details:", error);
        setError("Failed to load country details.");
      } finally {
        setLoading(false);
      }
    };

    getCountryDetails();
  }, [name]);

  if (loading) return <ActivityIndicator size="large" color={theme === "dark" ? "#ffffff" : "#000000"} style={styles.loader} />;

  return (
    <ScrollView style={[styles.container, theme === "dark" ? styles.dark : styles.light]}>
      {/* Theme Toggle Button */}
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Text style={[styles.toggleText, theme === "dark" ? styles.darkText : styles.lightText]}>
          {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
        </Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => (router.canGoBack() ? router.back() : router.push("/"))}
        style={[styles.backButton, theme === "dark" ? styles.darkButton : styles.lightButton]}
      >
        <Text style={[styles.backText, theme === "dark" ? styles.darkText : styles.lightText]}>⬅ Back</Text>
      </TouchableOpacity>

      {/* Error Handling */}
      {error ? (
        <Text style={[styles.errorText, theme === "dark" ? styles.darkText : styles.lightText]}>{error}</Text>
      ) : country ? (
        <>
          <Text style={[styles.title, theme === "dark" ? styles.darkText : styles.lightText]}>
            {country?.name?.common || "Unknown"}
          </Text>
          <Image
            source={{
              uri: country?.flags?.png || country?.flags?.svg || "https://via.placeholder.com/150",
            }}
            style={styles.flag}
            resizeMode="contain"
          />
          <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
            <Text style={styles.boldText}>Capital:</Text> {country?.capital?.[0] || "N/A"}
          </Text>
          <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
            <Text style={styles.boldText}>Population:</Text> {country?.population?.toLocaleString() || "Unknown"}
          </Text>
          <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
            <Text style={styles.boldText}>Region:</Text> {country?.region || "Unknown"}
          </Text>
          <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
            <Text style={styles.boldText}>Subregion:</Text> {country?.subregion || "Unknown"}
          </Text>
          <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
            <Text style={styles.boldText}>Continent:</Text> {country?.continents?.[0] || "Unknown"}
          </Text>
          <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
            <Text style={styles.boldText}>Country Code:</Text> {country?.cca3 || "N/A"}
          </Text>
          <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
            <Text style={styles.boldText}>Currency:</Text>{" "}
            {country?.currencies ? Object.values(country?.currencies)[0]?.name : "N/A"}
          </Text>
          <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
            <Text style={styles.boldText}>Languages:</Text>{" "}
            {country?.languages ? Object.values(country.languages).join(", ") : "N/A"}
          </Text>
        </>
      ) : (
        <Text style={[styles.errorText, theme === "dark" ? styles.darkText : styles.lightText]}>
          Country details not found.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dark: {
    backgroundColor: "#121212",
  },
  light: {
    backgroundColor: "#fff",
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  flag: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  backButton: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  darkButton: {
    backgroundColor: "#444",
  },
  lightButton: {
    backgroundColor: "#ccc",
  },
  backText: {
    fontSize: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  themeToggle: {
    alignSelf: "flex-end",
    padding: 10,
    marginBottom: 10,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
