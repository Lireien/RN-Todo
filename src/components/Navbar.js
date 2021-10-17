import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { THEME } from '../theme';
import { AppTextBold } from '../components/ui/AppTextBold';

export const Navbar = ({ title }) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navIos,
          android: styles.navAndroid,
        }),
      }}
    >
      <AppTextBold style={styles.text}> {title} </AppTextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  navAndroid: {
    backgroundColor: THEME.NAV_COLOR,
  },
  navIos: {
    borderBottomColor: THEME.NAV_COLOR,
    borderBottomWidth: 2,
  },
  text: {
    color: Platform.OS === 'android' ? '#fff' : THEME.NAV_COLOR,
    fontSize: 20,
  },
});
