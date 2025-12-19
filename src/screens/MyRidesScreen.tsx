import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import RideCard from '../components/RideCard';

interface Ride {
  id: number;
  driverName: string;
  driverImage: string | null;
  rating: number;
  date: string;
  tripType: string;
  pickup: string;
  drop: string;
  fare: number;
  distance: string;
  time: string;
  status: string;
}

const MyRidesScreen = ({navigation}: any) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      setLoading(true);
      
      // Replace with your actual API endpoint
      const response = await axios.get('https://your-api.com/api/rides');
      
      setRides(response.data.rides);
    } catch (error) {
      console.error('Error fetching rides:', error);
      
      // Mock data for demo
      setRides(mockRidesData);
    } finally {
      setLoading(false);
    }
  };

  const handleRepeatRide = async (ride: any) => {
    try {
      Alert.alert(
        'Repeat Ride',
        `Do you want to book a ride from ${ride.pickup} to ${ride.drop}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes, Book',
            onPress: async () => {
              // Replace with your actual API endpoint
              const response = await axios.post(
                'https://your-api.com/api/repeat-ride',
                {
                  rideId: ride.id,
                },
              );
              
              console.log('Repeat ride booked:', response.data);
              Alert.alert('Success', 'Ride booked successfully!');
              
              // Navigate to ride tracking or confirmation
              // navigation.navigate('RideTracking', { rideId: response.data.rideId });
            },
          },
        ],
      );
    } catch (error) {
      console.error('Error repeating ride:', error);
      Alert.alert('Error', 'Failed to book ride. Please try again.');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFC107" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Rides</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Rides List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {rides.length > 0 ? (
          rides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              onRepeatRide={handleRepeatRide}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No rides found</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navIconActive}>🚗</Text>
          <Text style={styles.navLabelActive}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navIcon}>❤️</Text>
          <Text style={styles.navLabel}>Saved</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Mock data for demonstration
const mockRidesData = [
  {
    id: 1,
    driverName: 'Amaan Shaikh',
    driverImage: null,
    rating: 4.5,
    date: '13/08/2025',
    tripType: 'Round Trip',
    pickup: 'Bus Sta Upas, Majestic, Bengaluru, K...',
    drop: 'M.G. Railway Colony, Majestic, Beng...',
    fare: 85,
    distance: '15.36km',
    time: '05:03 Pm',
    status: 'completed',
  },
  {
    id: 2,
    driverName: 'Amaan Shaikh',
    driverImage: null,
    rating: 4.5,
    date: '13/08/2025',
    tripType: 'Round Trip',
    pickup: 'Bus Sta Upas, Majestic, Bengaluru, K...',
    drop: 'M.G. Railway Colony, Majestic, Beng...',
    fare: 85,
    distance: '15.36km',
    time: '10:00 AM',
    status: 'completed',
  },
  {
    id: 3,
    driverName: 'Amaan Shaikh',
    driverImage: null,
    rating: 4.5,
    date: '13/08/2025',
    tripType: 'Round Trip',
    pickup: 'Bus Sta Upas, Majestic, Bengaluru, K...',
    drop: 'M.G. Railway Colony, Majestic, Beng...',
    fare: 85,
    distance: '15.36km',
    time: '10:00 AM',
    status: 'cancelled',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#1A1A1A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 4,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  navLabelActive: {
    fontSize: 12,
    color: '#FFC107',
    fontWeight: '600',
  },
  navLabel: {
    fontSize: 12,
    color: '#999999',
  },
});

export default MyRidesScreen;