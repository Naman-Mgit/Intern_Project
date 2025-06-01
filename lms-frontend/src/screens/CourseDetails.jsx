import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import { Video } from 'expo-av';
import Navbar from '../components/nav';
import Login from './Login';
import { api } from '../services/apiService';

const CourseDetails = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [courseDetails, setCourseDetails] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const defaultSyllabus = [
    { title: 'Introduction to Mathematics', content: 'Basic concepts and fundamentals' },
    { title: 'Algebra Basics', content: 'Equations and expressions' },
    { title: 'Geometry Fundamentals', content: 'Shapes and measurements' },
  ];

  const fetchCourseDetails = async () => {
    try {
      const response = await api.get(`/course/?id=${courseId}`);
      console.log("response", response)
      if (response.success) {
        setCourseDetails(response.data);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };
  useEffect(() => {

    fetchCourseDetails();
  }, [courseId]);

  const toggleAccordion = (index) => {
    setExpandedSection(prevIndex => (prevIndex === index ? null : index));
  };

  const handleEnrollClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  if (!courseDetails) {
    return <Text style={styles.loadingText}>Loading course details...</Text>;
  }

  return (
    <View style={styles.container}>
      <Navbar title={courseDetails.name} onBackPress={() => navigation.goBack()} />

      {courseDetails.demoVideoUrl && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: courseDetails.demoVideoUrl }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      )}

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{courseDetails.name}</Text>
        
        <View style={styles.detailsContainer}>
          <Text style={styles.detailItem}>
            Category: {courseDetails.category?.name || 'N/A'}
          </Text>
          <Text style={styles.detailItem}>
            Instructor: {courseDetails.teachers?.[0]?.name || 'N/A'}
          </Text>
          <Text style={styles.detailItem}>
            Price: {courseDetails.price ? `$${courseDetails.price}` : 'Free'}
          </Text>
          <Text style={styles.detailItem}>
            Course Type: {courseDetails.courseType || 'N/A'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Course Description</Text>
        <Text style={styles.description}>
          {courseDetails.description || 'No description available'}
        </Text>

        <Text style={styles.sectionTitle}>Syllabus</Text>
        {defaultSyllabus.map((section, index) => (
          <View key={index} style={styles.accordionSection}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleAccordion(index)}
            >
              <Text style={styles.accordionTitle}>{section.title}</Text>
              <Text style={styles.accordionIcon}>
                {expandedSection === index ? '-' : '+'}
              </Text>
            </TouchableOpacity>
            {expandedSection === index && (
              <View style={styles.accordionContent}>
                <Text style={styles.accordionText}>{section.content}</Text>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollClick}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Login onClose={closeModal} />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  videoContainer: {
    height: 200,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
  },
  detailItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
    marginTop: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  accordionSection: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  accordionIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  accordionContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
  accordionText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  enrollButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 30,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
});

export default CourseDetails;