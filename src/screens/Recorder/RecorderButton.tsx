import React from "react"
import { Pressable, View } from "react-native"

interface RecorderButtonProps {
  isRecording: boolean
  startRecording: () => void
  stopRecording: () => void
}

const RecorderButton: React.FC<RecorderButtonProps> = ({
  isRecording,
  startRecording,
  stopRecording,
}) => {
  return (
    <View className="absolute bottom-28 border-2 border-vr-white/50 rounded-full p-3">
      <Pressable
        className={` bottom-0 w-14 h-14 items-center ${isRecording ? "bg-vr-white/70 rounded-2xl" : "bg-red-500 rounded-full"} `}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  )
}

export default RecorderButton
