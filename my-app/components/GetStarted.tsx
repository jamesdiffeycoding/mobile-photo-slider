import { StyleSheet, View, Pressable, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign"; /* Get more icons: https://icons.expo.fyi/Index */
import { Link } from "expo-router";
type Props = {
  label: string;
  onPress?: () => void;
};

export default function StartEndButton({ label, onPress }: Props) {
  return (
    <View
      style={[
        styles.buttonContainer,
        { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
      ]}
    >
      <Link href="/sort">
        <AntDesign name="swap" size={24} color="#fff" />{" "}
        <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
