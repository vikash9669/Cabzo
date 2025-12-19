import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
const avt = require('../assets/avt.png');

const RideCard = ({ride, onRepeatRide}: any) => {
  const getStatusColor = () => {
    switch (ride.status) {
      case 'completed':
        return '#FFF9E6';
      case 'cancelled':
        return '#F5F5F5';
      default:
        return '#FFFFFF';
    }
  };

  const getStatusButtonText = () => {
    switch (ride.status) {
      case 'completed':
        return 'Repeat Ride';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Repeat Ride';
    }
  };

  const isButtonDisabled = ride.status === 'cancelled';

  return (
    <View style={[styles.card, {backgroundColor: getStatusColor()}]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.driverInfo}>
          <Image
            source={
              ride.driverImage
                ? {uri: ride.driverImage}
                : avt
            }
            style={styles.avatar}
          />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{ride.driverName}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.rating}>{ride.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tripInfo}>
          <View style={styles.dateContainer}>
            <Text style={styles.calendarIcon}>📅</Text>
            <Text style={styles.date}>{ride.date}</Text>
          </View>
          <View style={styles.tripTypeContainer}>
            <Text style={styles.carIcon}>🚗</Text>
            <Text style={styles.tripType}>{ride.tripType}</Text>
          </View>
        </View>
      </View>

      {/* Location Section */}
      <View style={styles.locationSection}>
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, styles.pickupDot]} />
          <Text style={styles.locationText} numberOfLines={1}>
            {ride.pickup}
          </Text>
        </View>

        <View style={styles.locationRow}>
          <View style={[styles.locationDot, styles.dropDot]} />
          <Text style={styles.locationText} numberOfLines={1}>
            {ride.drop}
          </Text>
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>🚗</Text>
          <Text style={styles.detailText}>₹{ride.fare}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>🗺️</Text>
          <Text style={styles.detailText}>{ride.distance}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>🕐</Text>
          <Text style={styles.detailText}>{ride.time}</Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={[
          styles.actionButton,
          isButtonDisabled && styles.actionButtonDisabled,
        ]}
        onPress={() => !isButtonDisabled && onRepeatRide(ride)}
        disabled={isButtonDisabled}
        activeOpacity={0.7}>
        <Text
          style={[
            styles.actionButtonText,
            isButtonDisabled && styles.actionButtonTextDisabled,
          ]}>
          {getStatusButtonText()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F5C518',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  locationSection: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  actionButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  actionButtonTextDisabled: {
    color: '#757575',
  },
});

export default RideCard;