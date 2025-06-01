import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importing local images
// import courseImage1 from 'C:/Users/Mohd Nazim/Desktop/ab/abhijeet/src/screens/tabs/download (1).jpg';
// import courseImage2 from 'C:/Users/Mohd Nazim/Desktop/ab/abhijeet/src/screens/tabs/download (2).jpg';
// import courseImage3 from 'C:/Users/Mohd Nazim/Desktop/ab/abhijeet/src/screens/tabs/download (3).jpg';
// import courseImage4 from 'C:/Users/Mohd Nazim/Desktop/ab/abhijeet/src/screens/tabs/download (4).jpg';

const Test = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const courses = [
    {
      id: '1',
      title: 'Mastering React Native',
      instructor: 'John Doe',
     // image: courseImage1, // Local image
      rating: 4.8,
      price: '$19.99',
      tag: 'New',
    },
    {
      id: '2',
      title: 'Full-Stack Development',
      instructor: 'Jane Smith',
      //image: courseImage2, // Local image
      rating: 4.7,
      price: '$14.99',
      tag: 'Popular',
    },
    {
      id: '3',
      title: 'Data Science Bootcamp',
      instructor: 'Robert Johnson',
     // image: courseImage3, // Local image
      rating: 4.9,
      price: '$24.99',
      tag: 'Trending',
    },
    {
      id: '4',
      title: 'UI/UX Design Essentials',
      instructor: 'Emily Davis',
     // image: courseImage4, // Local image
      rating: 4.6,
      price: '$17.99',
      tag: 'Popular',
    },
  ];

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
   
  };

  const renderCourse = ({ item }) => (
    <View style={styles.courseCard}>
      <Image source={item.image} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>{item.instructor}</Text>
        <View style={styles.courseMeta}>
          <Text style={styles.courseRating}>⭐ {item.rating}</Text>
          <Text style={styles.coursePrice}>{item.price}</Text>
        </View>
        {item.tag && (
          <View style={styles.tagContainer}>
            <Ionicons
              name="star-outline"
              size={14}
              color={item.tag === 'New' ? '#ff6347' : item.tag === 'Popular' ? '#008000' : '#FFD700'}
            />
            <Text style={styles.courseTag}>{item.tag}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.navbar}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.logo}
        />
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for courses"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      
      <Text style={styles.sectionTitle}>Popular Courses</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.courseList}
      />
      <Text style={styles.sectionTitle}>Recommended for You</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.verticalCourseList}
      />
    </SafeAreaView>
  );
};

export default Test;

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 8,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#0056b3',
    borderRadius: 8,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  courseList: {
    paddingHorizontal: 16,
  },
  verticalCourseList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  courseImage: {
    width: 200,
    height: 120,
    resizeMode: 'cover', // Keeps the aspect ratio
    borderRadius: 12,
    alignSelf: 'center',  // Centers the image horizontally
  },
  
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseRating: {
    fontSize: 14,
    color: '#888',
  },
  coursePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  courseTag: {
    marginLeft: 4,
    fontSize: 12,
    color: '#777',
  },
});
