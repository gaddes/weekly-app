import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

import tasksModel from './data/store/tasks';
import { ArchiveView, CreateView, CurrentView } from './views';
import { CreateIcon } from './components';

const Tab = createBottomTabNavigator();

export default function Main() {
  const { fetchInitialState } = tasksModel.actions;
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
              case 'Current':
                iconName = focused ? 'ios-list-box' : 'ios-list'; break;
              case 'Archive':
                // TODO: why doesn't archive-outline work?
                iconName = focused ? 'ios-archive' : 'ios-archive'; break;
              case 'New':
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
        <Tab.Screen name="Current" component={CurrentView} />
        <Tab.Screen name="New" component={CreateView} />
        <Tab.Screen name="Archive" component={ArchiveView} />
      </Tab.Navigator>

      <StatusBar style="dark" />
    </NavigationContainer>
  );
}