import { View, Image, StyleSheet } from "react-native";

interface AvatarOverlayProps {
  selectedAccessories: Accessory[];
}

const AvatarOverlay = ({ selectedAccessories }: AvatarOverlayProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/adaptive-icon.png")}
        style={styles.avatarImage}
      />
      {selectedAccessories.map((selectedAccessory) => (
        <Image
          source={require("../../assets/adaptive-icon.png")}
          key={selectedAccessory.accessory_id}
          style={styles[selectedAccessory.type]}
        />
      ))}
    </View>
  );
};

export default AvatarOverlay;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    width: 200,
    height: 350,
    alignContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  avatarImage: {
    position: "relative",
    width: "100%",
    height: 350,
    objectFit: "contain",
  },
  Headwear: {
    position: "absolute",
    top: 40,
    left: "50%",
    marginVertical: "auto",
    marginHorizontal: 0,
    width: 50,
    height: 50,
    objectFit: "contain",
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
  },
});
