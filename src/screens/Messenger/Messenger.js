import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Text,
    StyleSheet
} from 'react-native';



class MessengerScreen extends React.Component {


    static navigatorStyle = {
        navBarButtonColor: '#ADD8E6'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true,
                    to: 'open'
                });
            }
        }
    }

    render() {
        
        return (
            <View style = {styles.container}>
                <Text>
                    Messages
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connect(null, null)(MessengerScreen);