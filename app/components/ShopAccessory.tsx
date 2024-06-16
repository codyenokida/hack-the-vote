import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

interface ShopAccessoryProps {
  accessory: Accessory;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const ShopAccessory = ({
  accessory,
  onPress,
  disabled,
}: ShopAccessoryProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledButton : null]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <View style={styles.container}>
        <View style={styles.costContainer}>
          <Text style={styles.cost}>{accessory.cost}</Text>
        </View>
        <View>
          <Image
            source={require("../../assets/adaptive-icon.png")}
            style={styles.shopAccessoryImage}
          />
        </View>
        <Text style={styles.title}>{accessory.accessory_name}</Text>
        {disabled && (
          <View style={styles.disabled}>
            <Text>Already owned!</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ShopAccessory;

const styles = StyleSheet.create({
  button: {},
  disabledButton: {},
  container: {
    width: 128,
    height: 128,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  costContainer: {
    position: "absolute",
    backgroundColor: "blue",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    top: -8,
    right: -8,
    zIndex: 10,
  },
  cost: {
    color: "white",
  },
  shopAccessoryImage: {
    width: 96,
    height: 96,
    objectFit: "contain",
  },
  title: {
    paddingTop: 8,
  },
  disabled: {
    position: "absolute",
    margin: "auto",
  },
});
