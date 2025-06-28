import { Strings } from "@/src/constants/Strings"
import RecordContext from "@/src/store/RecordContent"
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio"
import { useContext, useEffect } from "react"
import { Alert, SafeAreaView, Text } from "react-native"
import RecorderButton from "./RecorderButton"
import RecordingList from "./RecordingList"
import WaveForm from "./WaveForm"

export default function RecorderScreen() {
  // initialize audio recorder
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)

  const { isRecording, setIsRecording, recordings, setRecordings } =
    useContext(RecordContext)

  // ask permissions on mount
  useEffect(() => {
    ;(async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync()
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied")
      }
    })()
    console.log("Audio permissions requested") //debug
  }, [])

  // Start recording
  const startRecording = async () => {
    setIsRecording(true)
    await audioRecorder.prepareToRecordAsync()
    audioRecorder.record()
    // console.log("Recording strated at:", audioRecorder.uri) //debug
    // console.log("hello world ") //debug
  }

  // Stop recording and add to recordings state
  const stopRecording = async () => {
    setIsRecording(false)
    await audioRecorder.stop()

    const recording = {
      uri: audioRecorder.uri,
      name: `Recording_${new Date().toISOString()}.m4a`,
    }
    setRecordings((prev) => [...prev, recording]) // add new recording to state
    // console.log("Recording saved at:", audioRecorder.uri) //debug
  }

  return (
    <SafeAreaView className="vr-view">
      <Text className="text-vr-white font-bold text-2xl">
        {Strings.appName}
      </Text>

      {/* WaveForm */}
      <WaveForm />

      {/* Recordings List */}
      <RecordingList recordings={recordings} />

      {/* Record Button */}
      <RecorderButton
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    </SafeAreaView>
  )
}
