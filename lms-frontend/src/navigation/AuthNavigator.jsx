import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Search from '../screens/Search';
import CourseDetails from '../screens/CourseDetails';
import MyTabs from '../components/tabs';
import LiveWebinarPage from '../screens/LiveWebinarPage';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Subscription from '../screens/Subscription';

const Stack = createStackNavigator();

const AuthRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                setIsAuthenticated(!!token);
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Not Authenticated. Redirecting...</Text>
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={MyTabs} />
            <Stack.Screen name="CourseDetails" component={CourseDetails} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Webinar" component={LiveWebinarPage} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Setting" component={Settings} />
            <Stack.Screen name="Subscription" component={Subscription} />
        </Stack.Navigator>
    );
};

export default AuthRoutes;