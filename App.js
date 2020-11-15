import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

import { ListView, ArchiveView, CreateView } from './views';
import { CreateIcon } from './components';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'List':
                iconName = focused ? 'ios-list-box' : 'ios-list'; break;
              case 'Archive':
                iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline'; break;
              case 'Create':
                return <CreateIcon focused={focused} />;
              default:
                iconName = null;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="List" component={ListView} />
        <Tab.Screen name="Create" component={CreateView} />
        <Tab.Screen name="Archive" component={ArchiveView} />
      </Tab.Navigator>

      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
