import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import Tour1 from "../pages/Tour1"
import Tour2 from "../pages/Tour2"
import Tour3 from "../pages/Tour3"
import Tour4 from "../pages/Tour4"

const Tab = createMaterialTopTabNavigator()

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                swipeEnabled: true,
                tabBarStyle: { display: "none" }
            }}
        >
            <Tab.Screen name="Uno" component={Tour1} />
            <Tab.Screen name="Dos" component={Tour2} />
            <Tab.Screen name="Tres" component={Tour3} />
            <Tab.Screen name="Cuatro" component={Tour4} />
        </Tab.Navigator>
    )
}