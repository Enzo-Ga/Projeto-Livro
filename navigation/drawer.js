import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTab from "./bottomTab";
import Profile from "../screens/profile";
import StackNavigator from "./stack";
import Logout from "../screens/logout";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="homeScreen" component={StackNavigator} />
      <Drawer.Screen name="profileScreen" component={Profile} />
      <Drawer.Screen name="logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
