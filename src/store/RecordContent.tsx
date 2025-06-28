import { createContext, Dispatch, SetStateAction } from "react"
import { Recording } from "../types"

interface RecordContext {
  isRecording: boolean
  setIsRecording: (isRecording: boolean) => void
  recordings: Recording[]
  //   setRecordings: (recordings: Recording[]) => void
  setRecordings: Dispatch<SetStateAction<Recording[]>>
}

const RecordContext = createContext<RecordContext>({
  isRecording: false,
  setIsRecording: () => {},
  recordings: [],
  setRecordings: () => {},
})

export default RecordContext
