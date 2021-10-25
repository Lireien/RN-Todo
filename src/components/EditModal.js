import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Modal,
  Button,
  Alert,
} from 'react-native';
import { THEME } from '../theme';
import { AppButton } from './ui/AppButton';

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        'Error',
        `Minimal length is 3 char. Now it's ${title.trim().length} char.!`
      );
    } else {
      onSave(title);
    }
  };

  const cancelHandler = () => {
    setTitle(value)
    onCancel()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modal}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Please, enter new name..."
          maxLength={40}
        />
        <View style={styles.buttons}>
          <AppButton color={THEME.RED_COLOR} onPress={cancelHandler}>
            Cancel
          </AppButton>
          <AppButton
            color={THEME.GREEN_COLOR}
            onPress={saveHandler}
          >Save changes</AppButton>
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.NAV_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
