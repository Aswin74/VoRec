import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { Tabs } from "expo-router"
import React from "react"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Record",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="mic" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="voiceList"
        options={{
          title: "Recordings 1",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
