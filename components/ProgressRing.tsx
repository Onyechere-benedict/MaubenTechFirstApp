import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {Circle, Svg} from 'react-native-svg';

const {width, height} = Dimensions.get('window').width;

const ProgressRing = ({height, width, viewBox}) => {
  return (
    <Svg>
      <Circle />
    </Svg>
  );
};

export default ProgressRing;
