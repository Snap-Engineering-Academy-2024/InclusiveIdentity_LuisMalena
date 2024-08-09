import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../utils/hooks/supabase"; // Import Supabase client
import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";
import { useAuthentication } from "../utils/hooks/useAuthentication";

const ChatScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('All');
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const [communityMsgs, setCommunityMsgs] = useState(0);
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]); // Placeholder for requests
  const { user } = useAuthentication();

  function getChatbots() {
    let chatbotsTemp = [];
    for (const botId in CHATBOTS) {
      chatbotsTemp.push({ isChatbot: true, chatId: botId });
    }
    setChats((otherChats) => [...otherChats, ...chatbotsTemp]);
  }

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("new_msg")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      setCommunityMsgs(data.new_msg);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    if (chats.length === 0) {
      getChatbots();
      // getUserChats();  // Uncomment this if you have the function to fetch user chats
    }

    if (user) {
      fetchUserData();
    }
  }, [chats, user, communityMsgs]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userButton}
      onPress={() => {
        navigation.navigate("Conversation", {
          isChatbot: item.isChatbot,
          chatId: item.chatId,
        });
      }}
    >
      <Ionicons
        style={styles.userIcon}
        name="person-outline"
        size={36}
        color="lightgrey"
      />
      <Text style={styles.userName}> {item.chatId} </Text>
      <Ionicons
        style={styles.userCamera}
        name="camera-outline"
        size={24}
        color="lightgrey"
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          marginBottom: tabBarHeight,
        },
      ]}
    >
      <Header title="Chat" />

      {selectedTab === 'All' && (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.chatId}
        />
      )}
      {selectedTab === 'Community' && (
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10, marginTop: 10 }}>
            Requests
          </Text>
          <FlatList
            data={requests}
            renderItem={renderItem}
            keyExtractor={(item) => item.chatId}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  notificationContainer: {
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  notificationTouchable: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationTextContainer: {
    marginLeft: 10,
  },
  notificationTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  notificationMessage: {
    fontSize: 14,
    color: "grey",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  tabText: {
    color: "grey",
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#0fadfe",
  },
  selectedTabText: {
    color: "#0fadfe",
  },
  userButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  userName: {
    fontSize: 18,
  },
  userStatus: {
    fontSize: 12,
    color: "grey",
  },
});

export default ChatScreen;
