import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

export default class WelcomeToReactVR extends React.Component {

  constructor() {
    super();
    this.state = {textColor: 'black'};
  }

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <Text
          onEnter={() => this.setState({textColor: 'red'})}
          onExit={() => this.setState({textColor: 'black'})}
          style={{
            color: this.state.textColor,
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            // transform: [{translate: [0, 0, -3]}],
          }}>
          This text will turn red when you look at it.
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('WelcomeToReactVR', () => WelcomeToReactVR);
