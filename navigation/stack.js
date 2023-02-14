import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./bottomTab";
import StoryScreen from "../screens/storyScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="tabScreen" component={BottomTab} />
      <Stack.Screen name="storyScreen" component={StoryScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
