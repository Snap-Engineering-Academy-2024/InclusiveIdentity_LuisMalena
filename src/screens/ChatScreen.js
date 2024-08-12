import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../components/Header";


const ChatScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('All');
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const [showNotif, setShowNotif] = useState(true);
 
  const handlePressNotif = () => {
    console.log("What the Sigma");
    setSelectedTab("Community");
    setShowNotif(false);
  };

  const chats = [
    { isChatbot: false, chatId: "My AI", avatar: "https://i.imgur.com/gVhTRnu_d.jpg?maxwidth=520&shape=thumb&fidelity=high", status: "Took a Screenshot • 2h" },
    { isChatbot: false, chatId: "Rob Black", avatar: "https://i.imgur.com/Ht4cY9d_d.jpg?maxwidth=520&shape=thumb&fidelity=high", status: "New Snap • 2h" },
    { isChatbot: false, chatId: "Jennifer Nguyen", avatar: "https://i.imgur.com/9ejBTJh_d.jpg?maxwidth=520&shape=thumb&fidelity=high", status: "New Snap • 2h" },
    { isChatbot: false, chatId: "Team Snapchat", avatar: "https://i.imgur.com/Ht4cY9d_d.jpg?maxwidth=520&shape=thumb&fidelity=high", status: "Received • 2h" },
    { isChatbot: false, chatId: "Cindy Lu", avatar: "https://i.imgur.com/Ht4cY9d_d.jpg?maxwidth=520&shape=thumb&fidelity=high", status: "Opened • 2h" },
    { isChatbot: false, chatId: "Design Platforms Team", avatar: "https://i.imgur.com/Ht4cY9d_d.jpg?maxwidth=520&shape=thumb&fidelity=high", status: "Received from Rajveer • 2h" },
    { isChatbot: false, chatId: "Cassie Lu", avatar: "https://i.imgur.com/Ht4cY9d_d.jpg?maxwidth=520&shape=thumb&fidelity=high", status: "New Chat • 2h" }
  ];
  const requests = [
    { isChatbot: false, chatId: "Rob Black", avatar: "https://i.imgur.com/Ht4cY9d_d.jpg?maxwidth=520&shape=thumb&fidelity=high", community: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAFVBMVEVbzvr1qbj////8p7T1prb5zdV6yfHLPJLlAAABBElEQVR4nO3dwQmDAAAEwdMY+y85JexLhDBTwr4PbgMAAAAAAAAAAIDH3IR9CDsIEiWJkkRJoiRRkihJlCRKEiWJkkRJoiRRkihJlCRKEiWJkkRJoiRRkihJlCRKEiWJkkRJoiRRkihJlHYR9iXsJEiUJEoSJYmSREmiJFGSKEmUJEoSJYmSREmiJFGSKEmUJEoSJYmSREmiJFGSKEmUJEoSJYmSREmiJFGSKEmUDPmSOWgyKk4SJYmSREmiJFGSKEmUJEoSJYmSREmiJFGSKEmUJEoSJYmSREmiJFGSKEmUJEoSJYmSREmiJFGSKEmUnKIm17rp7fNjAAAAAAAAAAAA/tkP8mG+UUNp+GMAAAAASUVORK5CYII=", status: "New Snap • 2h" },
    { isChatbot: false, chatId: "Jennifer Nguyen", avatar: "https://i.imgur.com/9ejBTJh_d.jpg?maxwidth=520&shape=thumb&fidelity=high", community: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAFVBMVEX/IYwhsf//2AD/AJL/2wAArv//4gBTW0lKAAAA+klEQVR4nO3QNwGAAAAEsaf6l4yEWxgTCdkAAAAAAAAAAAAAAAAAAAAA/nMR9hJ2EhQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUdpN2EPYQVCUFCVFSVFSlBQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlR+gCgNNPXuZWXGQAAAABJRU5ErkJggg==", status: "New Snap • 2h" },
  ];
  const accepted = [
    { isChatbot: false, chatId: "Cindy Lu", avatar: "https://i.imgur.com/Ht4cY9d_d.jpg?maxwidth=520&shape=thumb&fidelity=high", status: "Opened • 2h" },
    { isChatbot: false, chatId: "Cassie Che", avatar: "https://i.imgur.com/Ht4cY9d_d.jpg?maxwidth=520&shape=thumb&fidelity=high", status: "New Chat • 2h" }
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userButton}
      onPress={() => {
        navigation.navigate("CommunityChat");
      }}
    >
      <Image
        style={styles.avatar}
        source={{ uri: item.avatar }}
      />
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.userName}>{item.chatId} <Image
        style={styles.community}
        source={{ uri: item.community }}
      /></Text>
          <Text style={styles.userStatus}>{item.status}</Text>
        </View>
        <Ionicons name="camera-outline" size={24} color="lightgrey" />
      </View>
    </TouchableOpacity>
  );

  const tabs = ['All', 'Community', 'Groups', 'Stories', 'New'];

  const NotificationBar = () => (
    <View style={styles.notificationContainer}>
      <TouchableOpacity style={styles.notificationTouchable} onPress={handlePressNotif}>
        <View style={styles.notificationContent}>
          <Ionicons name="logo-snapchat" size={24} color="black" />
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationTitle}>New connection found!</Text>
            <Text style={styles.notificationMessage}>Someone in your radius wants to connect!</Text>
          </View>
        </View>
        <TouchableOpacity>
        <Ionicons name="close-outline" size={24} color="grey" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
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
      {showNotif && <NotificationBar />}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.selectedTab
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.selectedTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedTab === 'All' && (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.chatId}
        />
      )}
      {selectedTab === 'Community' && (
        <View> 
        <Text style={{fontWeight:'bold', fontSize: 20, marginLeft: 10, marginTop: 10}}>Requests</Text>
        
        <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.chatId}
        />

        <Text style={{fontWeight:'bold', fontSize: 20, marginLeft: 10, marginTop: 10}}>Accepted</Text>

        <FlatList
        data={accepted}
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
  community: {
    width: 15,
    height: 15,
    borderRadius: 20,
    // marginLeft: 245,
    marginLeft: 100,
    
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


// import React, { useState, useEffect } from "react";
// import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// // import Ionicons from "react-native-vector-icons/Ionicons";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { supabase } from "../utils/hooks/supabase"; // Import Supabase client
// import Header from "../components/Header";
// import { CHATBOTS } from "./ConversationScreen";
// import { useAuthentication } from "../utils/hooks/useAuthentication";
// import VideoPlayer from "../components/FigmaPlayer";

// export default function ChatScreen({ navigation }) {
//   const [chats, setChats] = useState([]);
//   const insets = useSafeAreaInsets();
//   const tabBarHeight = useBottomTabBarHeight();
//   const [communityMsgs, setCommunityMsgs] = useState(0);
//   const { user } = useAuthentication();
//   function getChatbots() {
//     let chatbotsTemp = [];
//     for (const botId in CHATBOTS) {
//       chatbotsTemp.push({ isChatbot: true, chatId: botId });
//     }

//     setChats((otherChats) => [...otherChats, ...chatbotsTemp]);
//   }
//   const fetchUserData = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("profiles") // Replace with your table name
//         .select("new_msg")
//         .eq("id", user.id)
//         .single();
//         setCommunityMsgs(data.new_msg);
//       if (error) throw error;

//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//       setLoading(false);
//     }
//   };

//   // async function getUserChats() {
//   //   // Fetch user chats from Supabase
//   //   const { data: userChats, error } = await supabase
//   //     .from('conversations')
//   //     .select('id')
//   //     .select('messages');

//   //   if (error) {
//   //     console.error("Error fetching user chats:", error);
//   //     return;
//   //   }

//   //   // Add user chats to array
//   //   let userChatsTemp = [];
//   //   if (userChats) {
//   //     userChats.forEach((userChat) => {
//   //       userChatsTemp.push({ isChatbot: false, chatId: userChat.id });
//   //     });
//   //   }

//   //   setChats((otherChats) => [...otherChats, ...userChatsTemp]);
//   // }

//   useEffect(() => {
//     if (chats.length < 1) {
//       getChatbots();
//       // getUserChats();
//     }
  
//     if (user !== null) {
//       const fetchUserDataAsync = async () => {
//         await fetchUserData();
//       };
  
//       fetchUserDataAsync();
//       if (communityMsgs > 0)
//       {
//         console.log(communityMsgs);
//       }
//     }
//   }, [chats.length, user, communityMsgs]);

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           paddingTop: insets.top,
//           paddingBottom: insets.bottom,
//           paddingLeft: insets.left,
//           paddingRight: insets.right,
//           marginBottom: tabBarHeight,
//         },
//       ]}
//     >
//       <Header title="Chat" />
      
//       <View>
//         {chats?.map((chat) => {
//           return (
//             <TouchableOpacity
//               style={styles.userButton}
//               onPress={() => {
//                 navigation.navigate("Conversation", {
//                   isChatbot: chat.isChatbot,
//                   chatId: chat.chatId,
//                 });
//               }}
//               key={chat.chatId}
//             >
//               <Ionicons
//                 style={styles.userIcon}
//                 name="person-outline"
//                 size={36}
//                 color="lightgrey"
//               />
//               <Text style={styles.userName}> {chat.chatId} </Text>
//               <Ionicons
//                 style={styles.userCamera}
//                 name="camera-outline"
//                 size={24}
//                 color="lightgrey"
//               />
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF",
//   },
//   userButton: {
//     padding: 25,
//     display: "flex",
//     borderBottomColor: "lightgrey",
//     borderBottomWidth: 1,
//   },
//   userIcon: {
//     position: "absolute",
//     left: 5,
//     top: 5,
//   },
//   userName: {
//     position: "absolute",
//     left: 50,
//     top: 14,
//     fontSize: 18,
//   },
//   userCamera: {
//     position: "absolute",
//     right: 15,
//     top: 10,
//   },
// });
