import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

// Define types for the country data
interface Country {
  cca3: string;
  name: { common: string };
  flags: { svg?: string; png?: string };
  capital?: string[];
  population?: number;
  region?: string;
  subregion?: string;
  continents?: string[];
  currencies?: Record<string, { name: string }>;
  languages?: Record<string, string>;
  states?: string[];
  government?: { leader?: string };
  countryCode?: string;
}

// ✅ Fetch All Countries
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    console.log("🔍 Fetching all countries from API...");
    const response = await axios.get<Country[]>(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("❌ API Request Failed:", error);
    return [];
  }
};

// ✅ Fetch Country Details
export const fetchCountryDetails = async (name: string): Promise<Country | null> => {
  try {
    console.log(`🔍 Fetching details for ${name}...`);
    const response = await axios.get<Country[]>(`${BASE_URL}/name/${encodeURIComponent(name)}?fullText=true`);
    
    if (!response.data || response.data.length === 0) {
      return null;
    }
    
    const country = response.data[0];
    
    return {
      cca3: country.cca3,
      name: country.name,
      flags: country.flags,
      capital: country.capital || ["N/A"],
      population: country.population || 0,
      region: country.region || "Unknown",
      subregion: country.subregion || "Unknown",
      continents: country.continents || ["Unknown"],
      currencies: country.currencies || {},
      languages: country.languages || {},
      states: country.hasOwnProperty("states") ? country.states : ["N/A"],
      government: country.hasOwnProperty("government") ? country.government : { leader: "N/A" },
      countryCode: country.cca3 || "N/A"
    };
  } catch (error) {
    console.error("❌ API Request Failed:", error);
    return null;
  }
};
