import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import ShopAccessory from "../components/ShopAccessory";
import { redeemAccessoryForPoints } from "../../utils/core";
import { getUser } from "../../lib/firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../lib/firebase/firebase";
import AvatarOverlay from "../components/AvatarOverlay";

interface RouterProps {
  navigation: NavigationProp<any, any>;
  user: any;
}

const shopAccessories: Accessory[] = [
  {
    accessory_id: "trump_hat",
    accessory_name: "Trump hat",
    cost: 20,
    type: "Headwear",
  },
  {
    accessory_id: "biden_hat",
    accessory_name: "Biden hat",
    cost: 20,
    type: "Headwear",
  },
];

const Redeem = ({ navigation, user: secureUser }: RouterProps) => {
  const [user, setUser] = useState<User>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDocument = async () => {
      try {
        setUserLoading(true);
        const currentUser = (await getUser(secureUser.uid)) as User;
        setUser(currentUser);
        setUserLoading(false);
      } catch (e) {
        console.error(e);
      } finally {
        setUserLoading(false);
      }
    };

    getDocument();
  }, [secureUser]);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(
      doc(FIRESTORE_DB, "users", user.user_id),
      (doc) => {
        const newData = doc.data() as User;
        setUser(newData);
      }
    );

    return unsub;
  }, [user]);

  const [loading, setLoading] = useState<boolean>(false);

  const purcahseAccessory = async (accessory: Accessory) => {
    try {
      setLoading(true);
      await redeemAccessoryForPoints(user.user_id, accessory);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AvatarOverlay selectedAccessories={[shopAccessories[0]]} />
      <Text>You have {user.points} points!</Text>
      <View style={styles.shopAccessoriesContainer}>
        {shopAccessories.map((shopAccessory) => (
          <ShopAccessory
            key={shopAccessory.accessory_id}
            accessory={shopAccessory}
            onPress={() => purcahseAccessory(shopAccessory)}
            disabled={
              !!user.accessories.find(
                (v) => v.accessory_id === shopAccessory.accessory_id
              )
            }
          />
        ))}
      </View>
    </View>
  );
};

export default Redeem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 350,
    objectFit: "contain",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  shopAccessoriesContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
});
