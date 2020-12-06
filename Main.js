import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

import { fetchInitialState } from './data/reducers/taskSlice';
import { ArchiveView, CreateView, ListView } from './views';
import { CreateIcon } from './components';

const Tab = createBottomTabNavigator();

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialState());
  }, []);

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
                // TODO: re-implement this larger "Create" button
                // return <CreateIcon focused={focused} />;
                iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline'; break;
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