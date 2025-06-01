import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Me = () => {
  const navigation = useNavigation();
  
  const icons = [
    { name: 'Webinars', icon: 'videocam-outline', onPress: () => navigation.navigate('Webinar') },
    { name: 'Profile', icon: 'person-outline', onPress: () => navigation.navigate('Profile') },
    { name: 'Calendar', icon: 'calendar-outline' },
    { name: 'Subscription', icon: 'card-outline', onPress: () => navigation.navigate('Subscription') },
    { name: 'Test', icon: 'clipboard-outline' },
    { name: 'QBank', icon: 'book-outline' },
    { name: 'Courses', icon: 'school-outline' },
    { name: 'Settings', icon: 'settings-outline', onPress: () => navigation.navigate('Setting') },
    { name: 'Supports', icon: 'help-circle-outline' },
    { name: 'Logout', icon: 'log-out-outline', onPress: () => navigation.navigate('PrivateRoute') },
  ];

  return (
    <View style={styles.container}>
     
      <View style={styles.navbar}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.logo}
        />
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Icons Section */}
      <View style={styles.iconsContainer}>
        {icons.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.iconCard}
            onPress={item.onPress || (() => {})}
          >
            <Ionicons name={item.icon} size={32} color="#007BFF" />
            <Text style={styles.iconText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Me;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
