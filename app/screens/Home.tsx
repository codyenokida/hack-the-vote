import {
  SafeAreaView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { getUser } from "../../lib/firebase/firestore";
import { isToday } from "../../utils/utils";

interface RouterProps {
  navigation: NavigationProp<any, any>;
  user: any;
}

const Home = ({ navigation, user: secureUser }: RouterProps) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDocument = async () => {
      try {
        setLoading(true);
        const currentUser = (await getUser(secureUser.uid)) as User;
        setUser(currentUser);
        setLoading(false);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getDocument();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const challengeButtonDisabled = isToday(user.last_completed_challenge_date);

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <CustomButton
          title={`Hi ${user.name}!`}
          onPress={() => navigation.navigate("Profile")}
        />
        <CustomButton
          title={`${user.points} points!`}
          onPress={() => navigation.navigate("Redeem")}
        />
      </View>
      <View style={styles.fullPage}>
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={styles.image}
        />
        <View style={styles.buttons}>
          <CustomButton title="Voting in 113 days!" onPress={() => void 0} />
          <CustomButton
            title="Daily Challenge"
            onPress={() => navigation.navigate("Challenge")}
            disabled={challengeButtonDisabled}
          />
          <CustomButton
            title="Learn"
            onPress={() => navigation.navigate("Learn")}
          />
          <CustomButton
            title="Redeem Points"
            onPress={() => navigation.navigate("Redeem")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 96,
    flexDirection: "row", // Set the direction of items to row (horizontal)
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFDEE", // Off-white color
    padding: 16,
  },
  safeArea: {
    flex: 1,
  },
  fullPage: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFDEE", // Off-white color
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 350,
    resizeMode: "contain", // To ensure the image scales nicely
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap", // Enable wrapping of items
    gap: 16,
    justifyContent: "center",
    backgroundColor: "#FFFDEE", // Off-white color
    padding: 10,
  },
});

export default Home;
