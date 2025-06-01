import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/apiService";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const [coursesResponse, categoriesResponse] = await Promise.all([
        api.get("/course"),
        api.get("/categories"),
      ]);

      if (!coursesResponse.success || !categoriesResponse.success) {
        throw new Error("Failed to fetch data");
      }

      const coursesData = await coursesResponse.data;
      const categoriesData = await categoriesResponse.data;

      setCourses(coursesData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const processCoursesAndCategories = (filteredCourses = courses) => {
    return categories
      .map((category) => ({
        ...category,
        courses: filteredCourses.filter(
          (course) => course.categoryId === category.id
        ),
      }))
      .filter(
        (category) =>
          category.courses.length > 0 ||
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const handleSearch = () => {
    const searchLower = searchQuery.toLowerCase();
    const filtered = courses.filter((course) => {
      const category = categories.find((cat) => cat.id === course.categoryId);
      return (
        course.name?.toLowerCase().includes(searchLower) ||
        category?.name.toLowerCase().includes(searchLower)
      );
    });

    return processCoursesAndCategories(filtered);
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCourseClick = (course) => {
    navigation.navigate("CourseDetails", {
      courseId: course.id,
      courseName: course.name,
      courseCategory: categories.find((cat) => cat.id === course.categoryId)
        ?.name,
    });
  };

  const renderCategory = ({ item: category }) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={styles.categoryHeader}
        onPress={() => toggleCategory(category.id)}
      >
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.arrowIcon}>
          {expandedCategories[category.id] ? "-" : "+"}
        </Text>
      </TouchableOpacity>

      {expandedCategories[category.id] && (
        <View style={styles.coursesContainer}>
          {category.courses.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseItem}
              onPress={() => handleCourseClick(course)}
            >
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseType}>{course.courseType}</Text>
              <Text style={styles.coursePrice}>${course.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading courses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navbar}>
        <Text style={styles.logo}>Logo</Text>
        <TouchableOpacity onPress={() => alert("Notifications")}>
          <Ionicons name="notifications" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search courses..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={handleSearch()}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.noResultsText}>No courses found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  navbar: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: { fontSize: 18, fontWeight: "bold" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  categoryContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  arrowIcon: {
    fontSize: 18,
    color: "#666",
  },
  coursesContainer: {
    marginTop: 8,
    marginLeft: 8,
  },
  courseItem: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  courseName: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  courseType: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  listContent: {
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: "white",
  },
  noResultsText: {
    color: "#666",
    fontSize: 16,
  },
  coursePrice: {
    fontSize: 12,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Courses;
