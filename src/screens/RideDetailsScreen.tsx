/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
const avt = require('../assets/avt.png');

const RideDetailsScreen = ({ navigation, route }: any) => {
  const rideId = route?.params?.rideId;
  const [rideDetails, setRideDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchRideDetails = async () => {
    try {
      setLoading(true);

      // Replace with your actual API endpoint
      const response = await axios.get(
        `https://your-api.com/api/rides/${rideId}`,
      );

      setRideDetails(response.data);
    } catch (error) {
      console.error('Error fetching ride details:', error);

      // Mock data for demo
      setRideDetails(mockRideDetails);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRideDetails();
  }, []);

  const handleSendEmail = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        'https://your-api.com/api/send-invoice',
        {
          rideId: rideDetails && rideDetails?.id,
          email: rideDetails && rideDetails?.userEmail,
        },
      );

      Alert.alert('Success', 'Invoice sent to your email successfully!');
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
      Alert.alert('Error', 'Failed to send email. Please try again.');
    }
  };

  const handleDownload = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(
        `https://your-api.com/api/invoice/${rideDetails.id}/download`,
        {
          responseType: 'blob',
        },
      );

      Alert.alert('Success', 'Invoice downloaded successfully!');
      console.log('Invoice downloaded:', response.data);

      // Handle file download based on platform
      // You might need react-native-fs or similar package for actual file saving
    } catch (error) {
      console.error('Error downloading invoice:', error);
      Alert.alert('Error', 'Failed to download invoice. Please try again.');
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

  if (!rideDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ride details not found</Text>
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
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Driver Info Section */}
        <View style={styles.driverSection}>
          <View style={styles.driverInfo}>
            <Image
              source={
                rideDetails.driverImage
                  ? { uri: rideDetails.driverImage }
                  : avt
              }
              style={styles.avatar}
            />
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{rideDetails.driverName}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.rating}>{rideDetails.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.tripInfo}>
            <View style={styles.dateContainer}>
              <Text style={styles.calendarIcon}>📅</Text>
              <Text style={styles.date}>{rideDetails.date}</Text>
            </View>
            <View style={styles.tripTypeContainer}>
              <Text style={styles.carIcon}>🚗</Text>
              <Text style={styles.tripType}>{rideDetails.tripType}</Text>
            </View>
          </View>
        </View>

        {/* Ride Details Section */}
        <Text style={styles.sectionTitle}>Ride Details</Text>

        <View style={styles.locationSection}>
          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.pickupDot]} />
            <Text style={styles.locationText} numberOfLines={1}>
              {rideDetails.pickup}
            </Text>
          </View>

          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.dropDot]} />
            <Text style={styles.locationText} numberOfLines={1}>
              {rideDetails.drop}
            </Text>
          </View>
        </View>

        {/* Trip Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🚗</Text>
            <Text style={styles.statText}>₹{rideDetails.fare}</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🗺️</Text>
            <Text style={styles.statText}>{rideDetails.distance}</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🕐</Text>
            <Text style={styles.statText}>{rideDetails.time}</Text>
          </View>
        </View>

        {/* Invoice Section */}
        <Text style={styles.sectionTitle}>Invoice</Text>

        <View style={styles.invoiceCard}>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceLabel}>Total fare</Text>
            <Text style={styles.invoiceValue}>
              ₹{rideDetails.invoice.totalFare}
            </Text>
          </View>

          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceLabel}>Ride Charge</Text>
            <Text style={styles.invoiceValue}>
              ₹{rideDetails.invoice.rideCharge}
            </Text>
          </View>

          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceLabel}>Booking Fees</Text>
            <Text style={styles.invoiceValue}>
              ₹{rideDetails.invoice.bookingFees}
            </Text>
          </View>

          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceLabel}>Discount</Text>
            <Text style={styles.invoiceDiscount}>
              -₹{rideDetails.invoice.discount}
            </Text>
          </View>

          {/* Send Email */}
          <TouchableOpacity
            style={styles.sendEmailButton}
            onPress={handleSendEmail}
            activeOpacity={0.7}
          >
            <Text style={styles.sendEmailText}>Send Email</Text>
            <Text style={styles.sendEmailArrow}>→</Text>
          </TouchableOpacity>

          {/* Download Button */}
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}
            activeOpacity={0.7}
          >
            <Text style={styles.downloadText}>Download</Text>
            <Text style={styles.downloadIcon}>⬇️</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Mock data for demonstration
const mockRideDetails = {
  id: 1,
  driverName: 'Amaan Shaikh',
  driverImage: null,
  rating: 4.5,
  date: '13/08/2025',
  tripType: 'Round Trip',
  pickup: 'Bus Sta Upas, Majestic, Bengaluru,...',
  drop: 'M.G. Railway Colony, Majestic, Ben...',
  fare: 85,
  distance: '15.36km',
  time: '05:03 Pm',
  userEmail: 'user@example.com',
  invoice: {
    totalFare: '24.05',
    rideCharge: '28.05',
    bookingFees: '02.05',
    discount: '06.00',
  },
};

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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 16,
    color: '#757575',
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
  driverSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  driverDetails: {
    justifyContent: 'center',
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  tripInfo: {
    alignItems: 'flex-end',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  calendarIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  date: {
    fontSize: 13,
    color: '#757575',
  },
  tripTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  tripType: {
    fontSize: 13,
    color: '#757575',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  locationSection: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  pickupDot: {
    backgroundColor: '#4CAF50',
  },
  dropDot: {
    backgroundColor: '#F44336',
  },
  locationText: {
    fontSize: 14,
    color: '#1A1A1A',
    flex: 1,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingVertical: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  invoiceCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  invoiceLabel: {
    fontSize: 15,
    color: '#1A1A1A',
  },
  invoiceValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  invoiceDiscount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4CAF50',
  },
  sendEmailButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  sendEmailText: {
    fontSize: 15,
    color: '#2196F3',
    fontWeight: '500',
  },
  sendEmailArrow: {
    fontSize: 16,
    color: '#2196F3',
  },
  downloadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
    marginTop: 12,
    alignSelf: 'center',
  },
  downloadText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginRight: 6,
  },
  downloadIcon: {
    fontSize: 14,
  },
});

export default RideDetailsScreen;
