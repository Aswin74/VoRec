import { Colors } from "@/src/constants/Colors"
import { Recording } from "@/src/types"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useAudioPlayer } from "expo-audio"
import React, { useState } from "react"
import { FlatList, Pressable, Text, View } from "react-native"

interface RecordingListProps {
  recordings: Recording[]
}

const RecordingList: React.FC<RecordingListProps> = ({ recordings }) => {
  return (
    <View className="w-full my-4 p-1 max-h-80 max-w-[90%] rounded-xl border border-white/10">
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.uri || item.name}
        renderItem={({ item }) => <RecordItem item={item} />}
        contentContainerStyle={{ paddingVertical: 8 }}
        ListEmptyComponent={
          <Text className="text-vr-white/70 text-center py-4">
            No recordings yet
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

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
    </View>
  )
}

export default RecordingList
