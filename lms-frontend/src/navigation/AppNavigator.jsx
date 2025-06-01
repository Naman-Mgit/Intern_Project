import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PublicRoute from './PublicNavigator';
import AuthRoutes from './AuthNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="PublicRoute" component={PublicRoute} />
                <Stack.Screen name="PrivateRoute" component={AuthRoutes} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
