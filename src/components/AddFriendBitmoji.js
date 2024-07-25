import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
// import { useNavigation } from "@react-navigation/native";

// import StoriesBitmoji from "../components/StoriesBitmoji";

import Header from "../components/Header";

export default function AddFriendBitmoji() {
    // const navigation = useNavigation();

  return (
    <View style={styles.myBitmoji}>
      <Image
        style={styles.bitmojiImage}
        source={require("../../assets/snapchat/personalBitmoji.png")}
      />
      <View style={styles.bitmojiTextContainer}>
        <Text style={styles.bitmojiText}>Name</Text>
        <Text style={styles.usernameText}>Username</Text>
      </View>
      <View>
        <Pressable
        onPress={() => {
            alert("New Friend Added!"); }}>
        
        <Text style={styles.addButtonText}>Quick Add</Text>

        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myBitmoji: {
    alignItems: "center",
    justifyContent: "center",
  },
  bitmojiImage: {
    width: 60,
    height: 60,
  },
  bitmojiTextContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
  },
  bitmojiText: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "700",
  },
  usernameText: {
    fontSize: 10,
    fontWeight: "700",
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: "700",
    opacity: 0.5,
  },
  Friends: {
    textAlign: "left",
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
});
