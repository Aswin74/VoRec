import { Recording } from "@/src/types"
import React from "react"
import { FlatList, Text, View } from "react-native"
import RecordItem from "./RecordItem"

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

export default RecordingList
