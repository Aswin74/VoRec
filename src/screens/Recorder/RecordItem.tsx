import { Recording } from "@/src/types"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useAudioPlayer } from "expo-audio"
import * as FileSystem from "expo-file-system"
import React, { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"

// Single RecordItem
const RecordItem: React.FC<{ item: Recording }> = ({ item }) => {
  const player = useAudioPlayer(item.uri)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayback = async () => {
    if (isPlaying) {
      await player.pause()
      setIsPlaying(false)
    } else {
      await player.seekTo(0) // optional: always start from beginning
      await player.play()
      setIsPlaying(true)

      // Reset play state after a few seconds (fallback)
      // You can also use a timeout here if needed.
      //   player.onEnded?.(() => setIsPlaying(false))
    }
  }

  const handleDelete = async (recordingUri: string) => {
    await FileSystem.deleteAsync(recordingUri)
  }

  return (
    <View className="p-2 mb-1 flex-row items-center justify-between l bg-white/10 rounded-lg w-fit">
      <Pressable onPress={togglePlayback} className="p-2">
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={24}
          color={Colors.vr_white}
        />
      </Pressable>
      <Text className="text-vr-white text-lg truncate">{item.name}</Text>
      <Pressable className="p-2">
        <MaterialIcons name={"delete"} size={24} color={Colors.vr_white} />
      </Pressable>
    </View>
  )
}

export default RecordItem
