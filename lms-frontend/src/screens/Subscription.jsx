import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const Subscription = () => {
  const navigation = useNavigation(); 

  const subscriptionDetails = {
    course: {
      startDate: '2024-01-01',
      expiryDate: '2024-12-31',
      price: '₹999',
      paymentMethod: 'UPI',
      status: 'Active',
    },
    test: {
      startDate: '2024-02-15',
      expiryDate: '2024-08-15',
      price: '₹499',
      paymentMethod: 'Credit Card',
      status: 'Active',
    },
    qbank: {
      startDate: '2024-03-01',
      expiryDate: '2025-03-01',
      price: '₹299',
      paymentMethod: 'Debit Card',
      status: 'Active',
    },
    webinars: {
      startDate: '2024-04-10',
      expiryDate: '2024-10-10',
      price: '₹1299',
      paymentMethod: 'Net Banking',
      status: 'Expired',
    },
  };

  return (
    <View style={styles.mainContainer}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>

        

        {/* Placeholder for additional nav buttons */}
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Subscription Details Content */}
      <ScrollView style={styles.container}>
        {/* Course Subscription Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Subscription</Text>
          <Text style={styles.sectionDescription}>Status: {subscriptionDetails.course.status}</Text>
          <Text style={styles.sectionDescription}>Start Date: {subscriptionDetails.course.startDate}</Text>
          <Text style={styles.sectionDescription}>Expiry Date: {subscriptionDetails.course.expiryDate}</Text>
          <Text style={styles.sectionDescription}>Price: {subscriptionDetails.course.price}</Text>
          <Text style={styles.sectionDescription}>Payment Method: {subscriptionDetails.course.paymentMethod}</Text>

          {/* Renewal Button */}
          {subscriptionDetails.course.status === 'Active' && (
            <TouchableOpacity style={styles.renewButton}>
              <Text style={styles.buttonText}>Renew Subscription</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Test Subscription Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Subscription</Text>
          <Text style={styles.sectionDescription}>Status: {subscriptionDetails.test.status}</Text>
          <Text style={styles.sectionDescription}>Start Date: {subscriptionDetails.test.startDate}</Text>
          <Text style={styles.sectionDescription}>Expiry Date: {subscriptionDetails.test.expiryDate}</Text>
          <Text style={styles.sectionDescription}>Price: {subscriptionDetails.test.price}</Text>
          <Text style={styles.sectionDescription}>Payment Method: {subscriptionDetails.test.paymentMethod}</Text>

          {/* Renewal Button */}
          {subscriptionDetails.test.status === 'Active' && (
            <TouchableOpacity style={styles.renewButton}>
              <Text style={styles.buttonText}>Renew Subscription</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* QBank Subscription Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QBank Subscription</Text>
          <Text style={styles.sectionDescription}>Status: {subscriptionDetails.qbank.status}</Text>
          <Text style={styles.sectionDescription}>Start Date: {subscriptionDetails.qbank.startDate}</Text>
          <Text style={styles.sectionDescription}>Expiry Date: {subscriptionDetails.qbank.expiryDate}</Text>
          <Text style={styles.sectionDescription}>Price: {subscriptionDetails.qbank.price}</Text>
          <Text style={styles.sectionDescription}>Payment Method: {subscriptionDetails.qbank.paymentMethod}</Text>

          {/* Renewal Button */}
          {subscriptionDetails.qbank.status === 'Active' && (
            <TouchableOpacity style={styles.renewButton}>
              <Text style={styles.buttonText}>Renew Subscription</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Live Webinars Subscription Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Webinars Subscription</Text>
          <Text style={styles.sectionDescription}>Status: {subscriptionDetails.webinars.status}</Text>
          <Text style={styles.sectionDescription}>Start Date: {subscriptionDetails.webinars.startDate}</Text>
          <Text style={styles.sectionDescription}>Expiry Date: {subscriptionDetails.webinars.expiryDate}</Text>
          <Text style={styles.sectionDescription}>Price: {subscriptionDetails.webinars.price}</Text>
          <Text style={styles.sectionDescription}>Payment Method: {subscriptionDetails.webinars.paymentMethod}</Text>

          {/* Renewal Button */}
          {subscriptionDetails.webinars.status === 'Expired' && (
            <TouchableOpacity style={styles.renewButton}>
              <Text style={styles.buttonText}>Renew Subscription</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
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
  section: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  },
  renewButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
