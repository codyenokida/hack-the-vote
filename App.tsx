import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Login from "./app/screens/Login";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./lib/firebase/firebase";
import Learn from "./app/screens/Learn";
import Home from "./app/screens/Home";
import Challenge from "./app/screens/Challenge";
import Redeem from "./app/screens/Redeem";
import Profile from "./app/screens/Profile";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout(extraProps) {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <Home {...props} user={extraProps.user} />}
      </InsideStack.Screen>
      <InsideStack.Screen
        name="Learn"
        component={Learn}
        // options={{ headerShown: false }}
      />
      <InsideStack.Screen name="Challenge">
        {(props) => <Challenge {...props} user={extraProps.user} />}
      </InsideStack.Screen>

      <InsideStack.Screen name="Redeem">
        {(props) => <Redeem {...props} user={extraProps.user} />}
      </InsideStack.Screen>
      <InsideStack.Screen name="Profile" component={Profile} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name="Inside" options={{ headerShown: false }}>
            {(props) => <InsideLayout props={props} user={user} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
