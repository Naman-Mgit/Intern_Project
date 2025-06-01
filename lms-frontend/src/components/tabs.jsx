import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Courses from "../screens/tabs/Courses";
import Home from "../screens/tabs/Home";
import Me from "../screens/tabs/me";
import Qbank from "../screens/tabs/Qbank";
import Test from "../screens/tabs/Test";
import { StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
function MyTabs() {

const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#1E90FF', 
          tabBarInactiveTintColor: '#8e8e8e',
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Courses"
          component={Courses}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="school" size={size} color={color} />
            ),
          }}
        />
        
        <Tab.Screen
          name="Test"
          component={Test}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="clipboard" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Qbank"
          component={Qbank}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Me"
          component={Me}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  export default MyTabs

  const styles = StyleSheet.create({
   
    tabBar: {
      backgroundColor: 'black', 
      borderTopWidth: 0, 
      height: 60, 
    },
  
   
    homeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', 
    },
    homeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333', 
    },
  

    profileContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e6e6e6', 
    },
    profileText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333', 
    },
  
    
    searchContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff', 
    },
    searchText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333', 
    },
  });