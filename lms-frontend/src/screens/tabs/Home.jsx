import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../services/apiService';

const handleQuizAnswer = (isCorrect) => {
  if (isCorrect) {
    alert('Correct Answer!');
  } else {
    alert('Incorrect. Try again!');
  }
};

const quizOptions = [
  { answer: 'Paris', correct: true },
  { answer: 'London', correct: false },
  { answer: 'Berlin', correct: false },
  { answer: 'Madrid', correct: false },
];

const imageUrls = [
  require('./download (1).jpg'),
  require('./download (2).jpg'),
  require('./download.jpg'),
];

const courses = [
  {
    id: 1,
    name: 'Course 1',
    description: 'This is a short description for Course 1.',
    image: require('./download (3).jpg'),
  },
  {
    id: 2,
    name: 'Course 2',
    description: 'This is a short description for Course 2.',
    image: require('./download (4).jpg'),
  },
  {
    id: 3,
    name: 'Course 3',
    description: 'This is a short description for Course 3.',
    image: require('./download (5).jpg'),
  },
];

const Home = () => {
const [courses , setcourses ] = useState([])
  const getCourses = async () =>{
    const data = await api.get("/course")
  setcourses(data?.data)
console.log("data", data?.data)

  }
useEffect(()=>{
  getCourses()
},[])
  return (
    <SafeAreaView style={styles.safeArea}>
      
      <StatusBar barStyle="default" hidden={true} />

   
      <View style={styles.navbar}>
        
        <Image
          source={{
            uri: 'https://s3-alpha-sig.figma.com/img/d319/0af4/bcb56b8eed55a856377ca23734a87330?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FiLDHzBEawpSRnihvXIDAfGoy3LuxlEpINAaBxQBa3I6liftXUblP1COKOKxPr2ZfjzstWpoGyMgzZ2IKrOqWhTkrph99QInmUD2a2nE6rK7fUrT5LslTCKcZvTIk-KAhIlzMQoROdkOP0pNrf4TxmXJgQIee287dCgf9lITb4j-ZMHNlQp5wf6r7Ks3eoY9VWYAM8kDPPbWxhF3uM55gUwh-hj-sb3Lhtaoa5aUdc1PbG6LrzqYhdLg2EFNqBwXpn1~DT61QTLvo~HWP0La8D3GQdre8zy1zu~L34R1dfP8aAmz6UeunHl5-LQoni3z0QFYJ19SPslQ0h8yXuztMw__',
          }}
          style={styles.logo}
        />

        
        <TouchableOpacity onPress={() => alert('Notifications')}>
          <Ionicons name="notifications" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>

     
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.slideshowContainer}>
        
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {imageUrls.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </ScrollView>
        </View>

       
        <View style={styles.topRatedCoursesContainer}>
          <Text style={styles.sectionTitle}>Top Rated Courses</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {courses.map((course) => (
              <View key={course.id} style={styles.courseCard}>
                <Image source={{ uri: course.imageUrl }} style={styles.courseImage} />
                <Text style={styles.courseTitle}>{course.name}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
              </View>
            ))}
          </ScrollView>
        </View>


<View style={styles.aboutUsContainer}>
          <Text style={styles.aboutTitle}>About Us</Text>
          <Text style={styles.aboutDescription}>
            We are a premium platform dedicated to providing the best online courses in various domains. 
            Our aim is to deliver world-class education that is accessible and effective, 
            helping you achieve your career and personal goals.
          </Text>
        </View>


       
        <View style={styles.dailyQuizContainer}>
          <Text style={styles.sectionTitle}>Daily Quiz</Text>

          
          <Text style={styles.quizQuestion}>What is the capital of France?</Text>

         
          <View style={styles.quizOptions}>
            {quizOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quizOption,
                  option.correct && styles.correctOption, 
                ]}
                onPress={() => handleQuizAnswer(option.correct)}
              >
                <Text style={styles.optionText}>{option.answer}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* About Us Section */}
<View style={styles.aboutUsContainer}>
          <Text style={styles.aboutTitle}>About Us</Text>
          <Text style={styles.aboutDescription}>
            We are a premium platform dedicated to providing the best online courses in various domains. 
            Our aim is to deliver world-class education that is accessible and effective, 
            helping you achieve your career and personal goals.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  navbar: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  scrollViewContent: {
    padding: 12,
    backgroundColor: '#fff',
  },
  slideshowContainer: {
    padding: 0,
    borderRadius: 10,
  },
  image: {
    width: 300,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
  topRatedCoursesContainer: {
    marginTop: 10,
    padding: 10,
    height: 280,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseCard: {
    width: 180,
    height: 200,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 3,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  dailyQuizContainer: {
    marginTop: 10,
    padding: 10,
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quizOptions: {
    marginTop: 10,
  },
  quizOption: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  aboutUsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    elevation: 2,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  aboutDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default Home;