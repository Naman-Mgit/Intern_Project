import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/apiService';

const Qbank = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [questionCategories, setQuestionCategories] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`/testseries`);
      if (response.success) {
        console
        setQuestionCategories(response.data);
        setFilteredQuestions(response.data);
        setLoading(false);
      }
     
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = questionCategories.filter((question) =>
      question.name.toLowerCase().includes(text.toLowerCase()) ||
      question.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredQuestions(filteredData);
  };

  const handleQuestionClick = (question) => {
    navigation.navigate('QuestionDetails', { questionId: question.id, questionName: question.name });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleQuestionClick(item)}>
      <View style={styles.cardIcon}>
        <Ionicons name="book-outline" size={24} color="#007BFF" />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardCategory}>{item.description}</Text>
      </View>
      <View style={styles.cardArrow}>
        <Ionicons name="chevron-forward-outline" size={24} color="#888" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navbar}>
        <Text style={styles.logo}>QBank</Text>
        <TouchableOpacity onPress={() => alert('Notifications')}>
          <Ionicons name="notifications" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Questions"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Ionicons name="search" size={24} color="#007BFF" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredQuestions}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#e8f4ff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardCategory: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  cardArrow: {
    marginLeft: 12,
  },
});

export default Qbank;
