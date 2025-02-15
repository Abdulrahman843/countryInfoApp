import React from "react";
import { StyleSheet, Platform, SafeAreaView } from "react-native";
import { Collapsible } from "@/components/Collapsible"; // ✅ Fixed import paths
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function Explore() {
  return (
    <SafeAreaView style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <IconSymbol
            size={310}
            name="chevron.left.forwardslash.chevron.right"
            style={styles.headerImage}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Explore</ThemedText>
        </ThemedView>
        <ThemedText>This app includes example code to help you get started.</ThemedText>

        {/* File-based Routing */}
        <Collapsible title="File-based routing">
          <ThemedText>
            This app has two screens:{" "}
            <ThemedText type="defaultSemiBold">app/index.tsx</ThemedText> and{" "}
            <ThemedText type="defaultSemiBold">app/explore.tsx</ThemedText>
          </ThemedText>
          <ThemedText>
            The layout file in <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText>{" "}
            sets up the Stack navigator.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        {/* Android, iOS, Web Support */}
        <Collapsible title="Android, iOS, and web support">
          <ThemedText>
            You can open this project on Android, iOS, and the web. To open the web version, press{" "}
            <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
          </ThemedText>
        </Collapsible>

        {/* Custom Fonts */}
        <Collapsible title="Custom fonts">
          <ThemedText>
            Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{" "}
            <ThemedText style={{ fontFamily: "SpaceMono" }}>
              custom fonts such as this one.
            </ThemedText>
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        {/* Animations */}
        <Collapsible title="Animations">
          <ThemedText>
            {Platform.OS === "ios" && (
              <>
                The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{" "}
                component provides a parallax effect for the header image.
              </>
            )}
            {Platform.OS === "android" && (
              <>
                Android animations are also supported using{" "}
                <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>.
              </>
            )}
          </ThemedText>
        </Collapsible>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  headerImage: {
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
