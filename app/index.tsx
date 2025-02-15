import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { fetchCountries } from "@/constants/api"; // ✅ Fixed import path

export default function HomeScreen() {
  const [countries, setCountries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const getCountries = async () => {
      try {
        console.log("🔍 Fetching countries from API...");
        const data = await fetchCountries();
        if (data?.length > 0) {
          setCountries(data);
        } else {
          setError("No country data received!");
        }
      } catch (err) {
        console.error("❌ Error fetching countries:", err);
        setError("Failed to load countries.");
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Country Information</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a country..."
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={countries.filter((country) =>
            country?.name?.common?.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.cca3 || Math.random().toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.countryItem}
              onPress={() => router.push(`/country/${encodeURIComponent(item.name.common)}`)}
            >
              <Image source={{ uri: item.flags.svg }} style={styles.flag} />
              <Text style={styles.countryName}>{item.name.common}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 5,
  },
  countryItem: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: "#333",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  countryName: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
  },
  flag: {
    width: 50,
    height: 30,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
