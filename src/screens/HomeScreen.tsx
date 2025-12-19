/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
const bike = require('../assets/bike.png');
const auto = require('../assets/auto.png');
const car = require('../assets/car2.png');
const carSide = require('../assets/carSide.png');
const cabzoLogo = require('../assets/cabzoLogo.png');
const carRental = require('../assets/carrental.png');
const rentalBanner = require('../assets/rentalBanner.png');
const cabzolast = require('../assets/cabzolast.png');


const HomeScreen = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');

  // const exploreOptions = [
  //   {
  //     id: 1,
  //     title: 'Bike',
  //     subtitle: 'Fast & Affordable\nRides',
  //     image: require('../assets/bike.png'),
  //   },
  //   {
  //     id: 2,
  //     title: 'Auto',
  //     subtitle: 'Hop in an Auto',
  //     image: require('../assets/auto.png'),
  //   },
  //   {
  //     id: 3,
  //     title: 'Auto',
  //     subtitle: 'Comfortable Mini Rides.',
  //     image: require('../assets/car-yellow.png'),
  //   },
  //   {
  //     id: 4,
  //     title: 'Premium',
  //     subtitle: 'Where comfort meets elegance.',
  //     image: require('../assets/car-premium.png'),
  //   },
  // ];

  const handleRideSelect = (rideType: any) => {
    console.log('Selected ride:', rideType);
    // navigation.navigate('BookRide', { rideType });
  };

  const handleRentNow = () => {
    console.log('Rent Now clicked');
    // navigation.navigate('RentalCar');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        
        {/* Header with Logo */}
        <View style={styles.header}>
          <Image
            source={cabzoLogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <Text style={styles.searchIconText}>🔍</Text>
          </View>
          <View style={styles.greenDot} />
          <TextInput
            style={styles.searchInput}
            placeholder="Your ride starts here – where to?"
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.micIcon}>
            <Text style={styles.micIconText}>🎤</Text>
          </TouchableOpacity>
        </View>

        {/* Explore Section */}
        <Text style={styles.sectionTitle}>Explore</Text>

        <View style={styles.exploreGrid}>
          {/* First Row */}
          <TouchableOpacity
            style={[styles.exploreCard, styles.cardSmall]}
            onPress={() => handleRideSelect('Bike')}
            activeOpacity={0.8}>
            <Text style={styles.cardTitle}>Bike</Text>
            <Text style={styles.cardSubtitle}>
              Fast & Affordable{'\n'}Rides
            </Text>
            <Image
              source={bike}
              style={styles.bikeImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.exploreCard, styles.cardSmall]}
            onPress={() => handleRideSelect('Auto')}
            activeOpacity={0.8}>
            <Text style={styles.cardTitle}>Auto</Text>
            <Text style={styles.cardSubtitle}>Hop in an Auto</Text>
            <Image
              source={auto}
              style={styles.autoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Second Row */}
          <TouchableOpacity
            style={[styles.exploreCard, styles.cardSmall]}
            onPress={() => handleRideSelect('Auto')}
            activeOpacity={0.8}>
            <Text style={styles.cardTitle}>Auto</Text>
            <Text style={styles.cardSubtitle}>
              Comfortable Mini Rides.
            </Text>
            <Image
              source={car}
              style={styles.carSmallImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.exploreCard, styles.cardSmall]}
            onPress={() => handleRideSelect('Premium')}
            activeOpacity={0.8}>
            <Text style={styles.cardTitle}>Premium</Text>
            <Text style={styles.cardSubtitle}>
              Where comfort meets elegance.
            </Text>
            <Image
              source={carSide}
              style={styles.carPremiumImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Journey Section */}
        <Text style={styles.journeyTitle}>Make your next journey simple</Text>

        {/* Rental Car Card */}
        <View style={styles.rentalCard}>
          <Image
            source={carRental}
            style={styles.rentalCarImage}
            resizeMode="contain"
          />
          <Text style={styles.rentalTitle}>Rental Car</Text>
          <Text style={styles.rentalSubtitle}>
            Choose rental options from 1 hour up to 12 hours.
          </Text>
          <TouchableOpacity
            style={styles.rentButton}
            onPress={handleRentNow}
            activeOpacity={0.8}>
            <Text style={styles.rentButtonText}>Rent Now</Text>
          </TouchableOpacity>
        </View>

        {/* Banner Image */}
        <Image
          source={rentalBanner}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* Bottom Illustration */}
        <Image
          source={cabzolast}
          style={styles.bottomIllustration}
          resizeMode="contain"
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navIconActive}>🏠</Text>
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navIcon}>🏛️</Text>
          <Text style={styles.navLabel}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navIcon}>❤️</Text>
          <Text style={styles.navLabel}>Saved</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 100,
    height: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchIconText: {
    fontSize: 20,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
  },
  micIcon: {
    marginLeft: 8,
  },
  micIconText: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  exploreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardSmall: {
    width: '47%',
    height: 160,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#757575',
    lineHeight: 16,
    marginBottom: 8,
  },
  bikeImage: {
    width: 100,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  autoImage: {
    width: 90,
    height: 70,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  carSmallImage: {
    width: 100,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 5,
  },
  carPremiumImage: {
    width: 110,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  journeyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 16,
  },
  rentalCard: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  rentalCarImage: {
    width: 200,
    height: 120,
    marginBottom: 16,
  },
  rentalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  rentalSubtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  rentButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  rentButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  bannerImage: {
    width: '100%',
    height: 140,
    marginVertical: 16,
  },
  bottomIllustration: {
    width: '100%',
    height: 200,
    marginBottom: 16,
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

export default HomeScreen;