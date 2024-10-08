import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import * as AV from 'expo-av'

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const configureAudio = async () => {
    await AV.Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: AV.InterruptionModeIOS.DuckOthers,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: AV.InterruptionModeAndroid.DuckOthers,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false,
    });
  };
  const handlePlayPause = async () => {
    await configureAudio(); // Configure audio settings before playing
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../assets/IMG_5009.mp4')}
        style={styles.video}
        resizeMode="contain"
        shouldPlay={isPlaying}
        isMuted={false}
        volume={1.0}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            setIsPlaying(false); // Reset to pause when the video finishes
          }
        }}
      />
      <Button title={isPlaying ? "Pause" : "Play"} onPress={handlePlayPause} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300, // Set a fixed width
    height: 300, // Set a fixed height
    backgroundColor: 'black', // Optional: Add a background color to see the video area
  },
});

export default VideoPlayer;
