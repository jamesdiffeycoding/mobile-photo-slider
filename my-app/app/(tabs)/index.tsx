import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import GetStarted from "@/components/GetStarted";

const Index = () => {
  return (
    <>
      {/* STATUS BAR */}
      <View style={styles.container}>
        {/* LOGO */}
        <Image
          style={styles.image}
          source={require("@/assets/images/icon.png")}
          contentFit="cover"
        />
        {/* SENTENCE */}
        <Text style={styles.text}>You have 392 photos to clean up!</Text>
        {/* START FROM END? */}
        <View style={styles.container}>
          <GetStarted label="get started" />
        </View>
      </View>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25222e",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderWidth: 1,
    height: 200,
    width: 300,
    borderColor: "white",
  },
  text: {
    color: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    padding: 5,
  },
});