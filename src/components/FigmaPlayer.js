import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
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
        source={require('../../assets/IMG_5009.mp4')} // Replace with your local video file
        style={styles.video}
        resizeMode="contain"
        shouldPlay={isPlaying}
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
    width: '100%',
    height: 400 , // Adjust height as needed
  },
});

export default VideoPlayer;
