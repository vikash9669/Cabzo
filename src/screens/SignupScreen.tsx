/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import CustomInput from '../components/CustomInput';
import CustomCheckbox from '../components/CustomCheckbox';
import CustomButton from '../components/CustomButton';
const texy = require('../assets/texysignup.png');
const SignupScreen = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};

    // Validate phone number
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // Validate terms agreement
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('https://your-api.com/api/signup', {
        phoneNumber: phoneNumber.trim(),
        agreedToTerms,
      });

      console.log('Signup successful:', response.data);

      // Navigate to next screen (e.g., OTP verification)
      // navigation.navigate('OTPVerification', { phoneNumber });

      Alert.alert('Success', 'Account created successfully!');
    } catch (error: any) {
      console.error('Signup error:', error);

      if (error.response) {
        // Server responded with error
        Alert.alert('Error', error.response.data.message || 'Signup failed');
      } else if (error.request) {
        // No response from server
        Alert.alert('Error', 'Network error. Please check your connection.');
      } else {
        // Other errors
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    // Navigate to sign in screen
    // navigation.navigate('SignIn');
    console.log('Navigate to Sign In');
  };

  const handleTermsPress = () => {
    // Navigate to terms and conditions screen
    // navigation.navigate('TermsAndConditions');
    console.log('Open Terms & Conditions');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image source={texy} style={styles.heroImage} resizeMode="contain" />
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Join Cabzo Today</Text>

          <Text style={styles.subtitle}>
            Let's get started! Enter your phone number to create your Indrive
            account.
          </Text>

          {/* Phone Number Input */}
          <CustomInput
            label="Phone Number"
            placeholder="Enter here"
            value={phoneNumber}
            onChangeText={(text: any) => {
              setPhoneNumber(text);
              if (errors.phoneNumber) {
                setErrors({ ...errors, phoneNumber: null });
              }
            }}
            keyboardType="phone-pad"
            maxLength={10}
            error={errors.phoneNumber}
          />

          {/* Terms Checkbox */}
          <CustomCheckbox
            checked={agreedToTerms}
            onPress={() => {
              setAgreedToTerms(!agreedToTerms);
              if (errors.terms) {
                setErrors({ ...errors, terms: null });
              }
            }}
            label="I agree to Indrive"
            linkText="Terms & Conditions."
            onLinkPress={handleTermsPress}
          />
          {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

          {/* Signup Button */}
          <CustomButton
            title="Signup"
            onPress={handleSignup}
            loading={loading}
            disabled={loading}
            style={styles.signupButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#757575',
    marginBottom: 24,
    lineHeight: 22,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  signInText: {
    fontSize: 15,
    color: '#757575',
  },
  signInLink: {
    fontSize: 15,
    color: '#2196F3',
    fontWeight: '600',
  },
  signupButton: {
    marginTop: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default SignupScreen;
