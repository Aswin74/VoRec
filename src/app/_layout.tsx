import "@/src/app/global.css"
import { Stack } from "expo-router"
import { useState } from "react"
import { StatusBar } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import RecordContext from "../store/RecordContent"
import { Recording } from "../types"

const [isRecording, setIsRecording] = useState<boolean>(false) // record toggle
const [recordings, setRecordings] = useState<Recording[]>([])

export default function RootLayout() {
  return (
    <RecordContext.Provider
      value={{ isRecording, setIsRecording, recordings, setRecordings }}
    >
      <SafeAreaProvider>
        <StatusBar barStyle={"light-content"} />

        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </RecordContext.Provider>
  )
}
