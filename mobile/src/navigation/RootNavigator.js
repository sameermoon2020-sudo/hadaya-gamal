import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import HomeScreen from '../screens/MainStack/HomeScreen';
import ProductsScreen from '../screens/MainStack/ProductsScreen';
import ProductDetailScreen from '../screens/MainStack/ProductDetailScreen';
import CartScreen from '../screens/MainStack/CartScreen';
import ChatsScreen from '../screens/MainStack/ChatsScreen';
import ChatDetailScreen from '../screens/MainStack/ChatDetailScreen';
import ProfileScreen from '../screens/MainStack/ProfileScreen';
import LoadingSpinner from '../components/LoadingSpinner';
import { COLORS } from '../utils/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const ProductsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProductsMain" component={ProductsScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const ChatsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ChatsMain" component={ChatsScreen} />
    <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'HomeTab') iconName = 'home';
        else if (route.name === 'ProductsTab') iconName = 'shopping-bag';
        else if (route.name === 'CartTab') iconName = 'shopping-cart';
        else if (route.name === 'ChatsTab') iconName = 'chat';
        else if (route.name === 'ProfileTab') iconName = 'person';

        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textLight,
      tabBarStyle: { borderTopColor: COLORS.border },
    })}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{ title: 'الرئيسية' }}
    />
    <Tab.Screen
      name="ProductsTab"
      component={ProductsStack}
      options={{ title: 'المنتجات' }}
    />
    <Tab.Screen
      name="CartTab"
      component={CartScreen}
      options={{ title: 'السلة' }}
    />
    <Tab.Screen
      name="ChatsTab"
      component={ChatsStack}
      options={{ title: 'المحادثات' }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{ title: 'الملف الشخصي' }}
    />
  </Tab.Navigator>
);

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;