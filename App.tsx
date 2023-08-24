/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {
  Button,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useDerivedValue,
  interpolateColor,
  useAnimatedProps,
} from 'react-native-reanimated';
import {Circle, Svg} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const radius = 45;
const circumference = radius * (Math.PI * 2);
const duration = 5000;

const App = () => {
  const strokeOffset = useSharedValue(circumference);

  const percentage = useDerivedValue(() => {
    const number = ((circumference - strokeOffset.value) / circumference) * 100;
    return withTiming(number, {duration: duration});
  });

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(
      percentage.value,
      [0, 50, 100],
      ['#9e4784', '#66347f', '#373706'],
    );
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashOffset: withTiming(strokeOffset.value, {duration: duration}),
      stroke: strokeColor.value,
    };
  });

  useEffect(() => {
    strokeOffset.value = 0;
  });

  return (
    <View style={styles.background}>
      <Image
        source={require('./resource/new/firstImage.jpeg')}
        style={styles.imageBackground}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <View style={styles.welcomeText}>
        <View style={styles.text}>
          <Text style={styles.textOne}>Get closer to your peers</Text>
          <Text style={styles.textTwo}>Online like never before</Text>
        </View>
        <View style={styles.skipLinks}>
          <View>
            <Text style={styles.skip}>Skip</Text>
          </View>
          <View style={styles.space}>
            <View style={styles.activePage} />
            <View style={styles.inactivePageOne} />
            <View style={styles.inactivePageTwo} />
          </View>
          <View style={styles.goToNextPage}>
            <View style={styles.progressRing}>
              <Svg
                height={(10 / 100) * height}
                width={(20 / 100) * width}
                viewBox="0 0 20 100">
                <Circle
                  cx={20}
                  cy={50}
                  r={45}
                  stroke={'black'}
                  strokeWidth={10}
                  fill={'transparent'}
                />
                <AnimatedCircle
                  animatedProps={animatedCircleProps}
                  cx={20}
                  cy={50}
                  r={45}
                  strokeDasharray={`${radius * (Math.PI * 2)}`}
                  stroke={'black'}
                  strokeWidth={10}
                  fill={'transparent'}
                />
              </Svg>
            </View>
            <FontAwesomeIcon
              style={styles.nextPageArrow}
              icon={faCircleArrowRight}
              size={39}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },

  imageBackground: {
    flex: 2,
    flexDirection: 'column',
    width: 415,
    height: 490,
    position: 'absolute',
  },
  welcomeText: {
    flex: 1,
    alignItems: 'center',
    marginTop: (50 / 100) * height,
    // borderWidth: 1,
    borderRadius: 55,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  text: {
    paddingTop: 50,
  },
  textOne: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
  textTwo: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
  skipLinks: {
    flexDirection: 'row',
    width,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: (5 / 100) * width,
    paddingRight: (5 / 100) * width,
  },
  space: {
    flexDirection: 'row',
    gap: 2,
  },
  skip: {
    color: 'gold',
    fontSize: 20,
  },
  activePage: {
    width: 40,
    borderWidth: 9,
    borderRadius: 100,
    height: 0,
  },
  inactivePageOne: {
    borderWidth: 9,
    borderRadius: 100,
    borderColor: 'gray',
    height: 0,
  },
  inactivePageTwo: {
    borderWidth: 9,
    borderRadius: 100,
    borderColor: 'gray',
    color: 'white',
    height: 0,
  },
  goToNextPage: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: (45 / 100) * height,
  },

  progressRing: {
    position: 'absolute',
  },

  nextPageArrow: {
    top: 0,
  },
});

export default App;
