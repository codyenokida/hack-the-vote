import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { NavigationProp } from "@react-navigation/native";
import {
  addLastCompletedChallengeDate,
  incrementDailyStreak,
  rewardUserPoints,
} from "../../lib/firebase/firestore";

type MultipleChoices = "A" | "B" | "C" | "D";

interface Question {
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  explanation: string;
  correct_answer: MultipleChoices;
}

interface RouterProps {
  navigation: NavigationProp<any, any>;
  user: any;
}

const Challenge = ({ navigation, user }: RouterProps) => {
  const [data, setData] = useState<Question>(null);
  const [loading, setLoading] = useState(true);

  /**
   * States for verifying answers
   */
  const [numTry, setNumTry] = useState<number>(0);
  const [correct, setCorrect] = useState<boolean>(false);
  const [disabledOptions, setDisabledOptions] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/question/random")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (numTry >= 2) {
      //   navigation.navigate("Lessons");
    }
  }, [numTry]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  async function verifyAnswer(attemptedAnswer: MultipleChoices) {
    const correctAnswer = data?.correct_answer.replaceAll(/\s/g, "");
    if (!(setCorrect && setNumTry)) return;
    if (attemptedAnswer === correctAnswer) {
      setCorrect(true);
      setModalVisible(true);
      const userId = user.uid;
      await rewardUserPoints(userId, 10);
      await incrementDailyStreak(userId);
      await addLastCompletedChallengeDate(userId);
      return;
    } else {
      setCorrect(false);
      setNumTry(numTry + 1);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.question}</Text>
      <View style={styles.choices}>
        <CustomButton title={data.A} onPress={() => verifyAnswer("A")} />
        <CustomButton title={data.B} onPress={() => verifyAnswer("B")} />
        <CustomButton title={data.C} onPress={() => verifyAnswer("C")} />
        <CustomButton title={data.D} onPress={() => verifyAnswer("D")} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Yay you got the right answer!</Text>
            <View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  navigation.navigate("Learn");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>
                  Learn more at the learn page
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                navigation.navigate("Home");
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Go back to home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View>
        {correct && <Text>{data.explanation}</Text>}
        {numTry >= 2 && !correct && (
          <Text>Nooo you couldn't get it right :c</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  choices: {
    marginTop: 16,
    gap: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Challenge;
