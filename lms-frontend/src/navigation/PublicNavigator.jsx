import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Registration from '../screens/Ragistration';

const Stack = createStackNavigator();

const PublicRoute = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />

        </Stack.Navigator>
    );
};

export default PublicRoute;
