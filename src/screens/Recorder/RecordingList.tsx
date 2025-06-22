import { Recording } from "@/src/types"
import { AudioPlayer, createAudioPlayer } from "expo-audio"
import React, { useState } from "react"
import { FlatList, Text, View } from "react-native"

interface RecordingListProps {
  recordings: Recording[]
}

const RecordingList: React.FC<RecordingListProps> = ({ recordings }) => {
  return (
    <View className="w-full mt-4 mb-6 max-h-80 rounded-xl bg-white/5 border border-white/10">
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
  const [player] = useState<AudioPlayer>(() => createAudioPlayer(item.uri))
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayback = async () => {
    if (isPlaying) {
      await player.pause()
      setIsPlaying(false)
    } else {
      await player.play()
      setIsPlaying(true)

      // Auto-reset on playback end
      //   player.seekTo(0)
      //   setIsPlaying(false)
    }
  }
  return (
    <View className="px-4 py-3 border-b border-white/10">
      <Text className="text-vr-white font-semibold text-base truncate">
        {item.name}
      </Text>
      <Text className="text-vr-white/50 text-xs truncate">{item.uri}</Text>
    </View>
  )
}

export default RecordingList
