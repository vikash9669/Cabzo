import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
} from 'react-native';
import axios from 'axios';

const VerifyPhoneScreen = ({navigation, route}: any) => {
  const phoneNumber = route?.params?.phoneNumber || '+91 8238658110';
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = React.useRef<Array<TextInput | null>>([]);

  // Timer countdown
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (text: any, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      Alert.alert('Error', 'Please enter the 4-digit OTP code');
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('https://your-api.com/api/verify-otp', {
        phoneNumber,
        otp: otpCode,
      });

      console.log('Verification successful:', response.data);
      
      // Navigate to next screen
      // navigation.navigate('Home');
      
      Alert.alert('Success', 'Phone number verified successfully!');
    } catch (error: any) {
      console.error('Verification error:', error);
      
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Invalid OTP code');
      } else if (error.request) {
        Alert.alert('Error', 'Network error. Please check your connection.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      // Replace with your actual API endpoint
      await axios.post('https://your-api.com/api/resend-otp', {
        phoneNumber,
      });

      Alert.alert('Success', 'OTP code has been resent to your phone');
      
      // Reset timer
      setTimer(59);
      setCanResend(false);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error('Resend OTP error:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Verify Phone Number</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Please enter the 4 digit code sent to {phoneNumber} through SMS
        </Text>

        {/* OTP Input Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref: TextInput | null) => { inputRefs.current[index] = ref; }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Resend Code */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Haven't got the confirmation code yet?{' '}
          </Text>
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </View>

        {canResend && (
          <TouchableOpacity
            onPress={handleResendOTP}
            style={styles.resendButton}>
            <Text style={styles.resendButtonText}>Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Verify Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.verifyButton,
            loading && styles.verifyButtonDisabled,
          ]}
          onPress={handleVerify}
          disabled={loading}
          activeOpacity={0.8}>
          <Text style={styles.verifyButtonText}>
            {loading ? 'Verifying...' : 'Verify'}
          </Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 24,
  },
  backIcon: {
    fontSize: 28,
    color: '#1A1A1A',
    fontWeight: '400',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#757575',
    lineHeight: 22,
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: '#FFC107',
    borderRadius: 12,
    fontSize: 32,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  resendText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  timerText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resendButtonText: {
    fontSize: 15,
    color: '#2196F3',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  verifyButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  verifyButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});

export default VerifyPhoneScreen;