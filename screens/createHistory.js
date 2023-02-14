import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "Image1",
      dropDownHeight: 40,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        theme = data.val().current_theme;
        this.setState({
          light_theme: theme === "light",
        });
      });
  };

  async addStory() {
    if (
      this.state.title &&
      this.state.description &&
      this.state.story &&
      this.state.moral
    ) {
      let storyData = {
        preview_image: this.state.previewImage,
        title: this.state.title,
        description: this.state.description,
        moral: this.state.moral,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        likes: 0,
      };
      await firebase
        .database()
        .ref("/posts/" + Math.random().toString(36).slice(2))
        .set(storyData)
        .then(function (data) {})
        .catch((error) => {
          alert(error.mesage);
        });
      this.props.navigation.navigate("Feed");
    } else {
      alert("Error", "Todos os campos são obrigatórios");
    }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let previewImages = {
        Image1: require("../assets/story_image_1.png"),
        Image2: require("../assets/story_image_2.png"),
        Image3: require("../assets/story_image_3.png"),
        Image4: require("../assets/story_image_4.png"),
        Image5: require("../assets/story_image_5.png"),
      };
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Nova História</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                style={styles.previewImage}
                source={previewImages[this.state.previewImage]}
              />
              <View>
                <DropDownPicker
                  items={[
                    { label: "Image1", value: "Image1" },
                    { label: "Image2", value: "Image2" },
                    { label: "Image3", value: "Image3" },
                    { label: "Image4", value: "Image4" },
                    { label: "Image5", value: "Image5" },
                  ]}
                  defaultValue={this.state.previewImage}
                  open={this.state.dropDownHeight === 170 ? true : false}
                  onOpen={() => {
                    this.setState({ dropDownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropDownHeight: 40 });
                  }}
                  onSelectItem={(item) => {
                    this.setState({ previewImage: item.value });
                  }}
                  placeholder={this.state.previewImage}
                  style={{
                    backgroundColor: "transparente",
                    borderWidth: 1,
                    borderColor: this.state.light_theme ? "#15193c" : "white",
                    color: this.state.light_theme ? "#15193c" : "white",
                  }}
                  textStyle={{
                    color:
                      this.state.dropDownHeight === 170 ? "#15193c" : "white",
                    fontFamily: "Bubblegum-Sans",
                  }}
                />
              </View>
              <TextInput
                onChangeText={(title) => {
                  this.setState({ title: title });
                }}
                placeholder={"Titulo"}
                placeholderTextColor={
                  this.state.light_theme ? "#15193c" : "white"
                }
                style={styles.inputFont}
              />
              <TextInput
                onChangeText={(description) => {
                  this.setState({ description: description });
                }}
                placeholder={"Descrição"}
                placeholderTextColor={
                  this.state.light_theme ? "#15193c" : "white"
                }
                multiline={true}
                numberOfLines={4}
                style={[
                  this.state.light_theme
                    ? styles.inputFontLight
                    : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
              />
              <TextInput
                onChangeText={(story) => {
                  this.setState({ story: story });
                }}
                placeholder={"Historia"}
                placeholderTextColor={
                  this.state.light_theme ? "#15193c" : "white"
                }
                multiline={true}
                numberOfLines={20}
                style={[
                  this.state.light_theme
                    ? styles.inputFontLight
                    : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
              />
              <TextInput
                onChangeText={(moral) => {
                  this.setState({ moral: moral });
                }}
                placeholder={""}
                placeholderTextColor={
                  this.state.light_theme ? "#15193c" : "white"
                }
                multiline={true}
                numberOfLines={4}
                style={[
                  this.state.light_theme
                    ? styles.inputFontLight
                    : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
              />
              <View
                style={{
                  marginTop: RFValue(20),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button title={"Enviar"} onPress={this.addStory}></Button>
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  appTitleTextLight: {
    color: "#2F345D",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "#2F345D",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "#2F345D",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
});
