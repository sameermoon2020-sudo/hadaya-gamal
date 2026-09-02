import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/MainStack/HomeScreen';
import ProductsScreen from '../screens/MainStack/ProductsScreen';
import ProductDetailScreen from '../screens/MainStack/ProductDetailScreen';
import CartScreen from '../screens/MainStack/CartScreen';
import ChatsScreen from '../screens/MainStack/ChatsScreen';
import ChatDetailScreen from '../screens/MainStack/ChatDetailScreen';
import ProfileScreen from '../screens/MainStack/ProfileScreen';
import { COLORS } from '../utils/colors';

const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: COLORS.background },
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Products" component={ProductsScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Chats" component={ChatsScreen} />
    <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

export default MainNavigator;