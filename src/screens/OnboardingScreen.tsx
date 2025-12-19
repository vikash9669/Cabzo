/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
// @ts-ignore - image module declaration missing in project; use require to load the asset
const car = require('../assets/car.png');

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image source={car} style={styles.heroImage} resizeMode="contain" />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Making your{'\n'}drive best is our{'\n'}responsibility
        </Text>

        <Text style={styles.subtitle}>We take the wheel for your Comfort.</Text>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            // Navigate to next screen
            // navigation.navigate('NextScreen');
            console.log('Get Started pressed');
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  heroImage: {
    width: width * 0.9,
    height: height * 0.35,
  },
  contentContainer: {
    flex: 0.5,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#757575',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFC107',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    marginHorizontal: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 8,
  },
  arrow: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  activeDot: {
    width: 80,
    backgroundColor: '#FFC107',
  },
});

export default OnboardingScreen;
