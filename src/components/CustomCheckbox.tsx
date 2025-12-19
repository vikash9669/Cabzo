import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const CustomCheckbox = ({checked, onPress, label, linkText, onLinkPress}: any) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <View style={styles.checkmark} />}
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}{' '}
          {linkText && (
            <Text style={styles.link} onPress={onLinkPress}>
              {linkText}
            </Text>
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    borderColor: '#2196F3',
    backgroundColor: '#2196F3',
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  link: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
});

export default CustomCheckbox;