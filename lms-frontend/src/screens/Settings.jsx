import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Settings = () => {
  const navigation = useNavigation(); // Hook to get access to navigation

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <View style={styles.mainContainer}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>

        {/* Text component properly used for navbar title */}
        <Text style={styles.navTitle}>Settings</Text>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Settings Content */}
      <ScrollView style={styles.container}>
        <View style={styles.optionContainer}>
          {/* Wrap text inside Text component */}
          <TouchableOpacity style={styles.option}>
            <Ionicons name="person-outline" size={24} color="#007BFF" />
            <Text style={styles.optionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="lock-closed-outline" size={24} color="#007BFF" />
            <Text style={styles.optionText}>Privacy & Security</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="notifications-outline" size={24} color="#007BFF" />
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="help-circle-outline" size={24} color="#007BFF" />
            <Text style={styles.optionText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FF3D3D" />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navButton: {
    padding: 10,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  optionContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});
