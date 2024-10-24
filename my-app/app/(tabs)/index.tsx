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
          source={"/assets/images/icon.png"}
          contentFit="cover"
        />
        {/* SENTENCE */}
        <Text style={styles.text}>You have 392 photos to clean up!</Text>
        {/* START FROM END? */}
        <View style={styles.container}>
          <GetStarted label="get started"></GetStarted>
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
    // backgroundColor: "#25292e",

    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
    borderWidth: "1px",
    height: "200px",
    width: "300px",
    borderBlockColor: "white",
  },
  text: {
    color: "#fff",
  },
  title: {
    fontSize: "20px",
    color: "#fff",
    fontWeight: "bold",
    padding: "5px",
  },
});
