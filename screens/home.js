import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import colors from '../colors';
import { useDB } from '../context';
import { FlatList } from 'react-native';

const View = styled.View`
  flex: 1;
  padding: 0 30px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
`;
const Emotion = styled.Text`
  font-size: 20px;
  margin-right: 10px;
`;
const Message = styled.Text`
  font-size: 18px;
`;
const Seperator = styled.View`
  height: 10px;
`;

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);
  useEffect(() => {
    const getFeelings = realm.objects('Feeling');
    setFeelings(getFeelings);
    // addListener()는 realm이 제공하는 이벤트 리스너이고 어떤 변경 사항(추가, 삭제, 업데이트)이 일어날 때 triggered된다.
    getFeelings.addListener(() => {
      const upToDateFeelings = realm.objects('Feeling');
      setFeelings(upToDateFeelings);
    });
    // 아래 코드는 이 Screen이 Unmount될 때 실행된다
    return () => {
      getFeelings.removeAllListeners();
    };
  }, []);
  return (
    <View>
      <Title>My journal</Title>
      <FlatList
        data={feelings}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={Seperator}
        keyExtractor={(feeling) => feeling._id + ''}
        renderItem={({ item }) => (
          <Record>
            <Emotion>{item.emotion}</Emotion>
            <Message>{item.message}</Message>
          </Record>
        )}
      />
      <Btn onPress={() => navigate('Write')}>
        <Ionicons name={'add'} color={'white'} size={40} />
      </Btn>
    </View>
  );
};
export default Home;
