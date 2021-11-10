import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { DBContext, useDB } from '../context';
import styled from 'styled-components/native';
import colors from '../colors';

const View = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
  padding: 0px 30px;
`;
const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px; 0px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;
const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 30px;
  background-color: ${colors.btnColor};
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
`;
const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Emotion = styled.TouchableOpacity`
  background-color: ${(props) => (props.selected ? '#34BE82' : 'white')};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
`;
const EmotionText = styled.Text`
  font-size: 24px;
`;

const emojis = ['😃', '🥰', '🤬', '😭', '😵‍💫', '😢', '😞'];

const Write = ({ navigation: { goBack } }) => {
  const realm = useDB();
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [feelings, setFeelings] = useState('');
  const onChangeText = (text) => setFeelings(text);
  const onEmotionPress = (face) => setSelectedEmotion(face);
  const onSubmit = () => {
    if (feelings === '' || selectedEmotion === null) {
      Alert.alert('Please fill in your feelings.');
      return;
    }
    realm.write(() => {
      realm.create('Feeling', {
        _id: Date.now(),
        emotion: selectedEmotion,
        message: feelings,
      });
    });
    goBack();
  };
  return (
    <View>
      <Title>How do you feel today?</Title>
      <Emotions>
        {emojis.map((emoji, index) => (
          <Emotion
            selected={emoji === selectedEmotion}
            onPress={() => onEmotionPress(emoji)}
            key={index}
          >
            <EmotionText>{emoji}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyType={'done'}
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder={'Write your feelings...'}
      />
      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </View>
  );
};
export default Write;
