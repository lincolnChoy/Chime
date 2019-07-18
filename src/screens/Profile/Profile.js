import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Image,
    StyleSheet,
    ActivityIndicator,
    Dimensions
} from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import { getTheme } from '../../utility/theme';
import { getProfile } from '../../store/actions/profile';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        profileState: state.profile
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile : (id) => dispatch(getProfile(id))
    }
}

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            profileLoaded: false,
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
        }
        Dimensions.addEventListener('change',this.updateDimensions);
    }

    componentDidMount() {
        /* Call fetch profile API */
        this.props.getProfile(this.props.user.id);
    }


    componentDidUpdate() {

        /* Load the profile if successfully fetched */
        const { profile, profileFetchResponse } = this.props.profileState;
        if (!this.state.profileLoaded) {
            // TODO:
            // Handle fail profile fetch response
            if (profileFetchResponse === 0) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        profile: profile,
                        profileLoaded: true
                    }
                })
            }
        }
    }

    updateDimensions = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }
    
    componentWillUnmount = () => {
        Dimensions.removeEventListener('change',this.updateDimensions);
    }

    render() {
        if (this.state.profile === null) {
            return (
                <View style = {styles.loadingContainer}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
            )
        }
        else {
            return (
                <View style = {[ (this.state.viewMode === 'portrait') ? styles.portraitContainer : styles.landScapeContainer, {backgroundColor: getTheme('bg')} ]}>

                    <View style = {styles.primaryDetailContainer}>
                        <View style = { [styles.avatarBox, { borderColor: getTheme('text')}] }>
                            <Image source = { { uri : this.state.profile.picture } } style = { styles.previewImage } />
                        </View>
                        <MainText>
                            { `${this.state.profile.first} ${this.state.profile.last}` }
                        </MainText>
                    </View>


                    <View style = {styles.secondaryDetailContainer}>
                        <MainText>
                            { `About me : ${this.state.profile.blurb}` }
                        </MainText>
                        <MainText>
                            { `Occupation : ${this.state.profile.occupation}` }
                        </MainText>
                        <MainText>
                            { `Birthday : ${this.state.profile.birthday}` }
                        </MainText>
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: getTheme('bg')
    },
    portraitContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    landScapeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    primaryDetailContainer: {
        alignItems: 'center'
    },
    secondaryDetailContainer: {
        marginTop: 50
    },
    avatarBox: {
        margin: 5,
        borderWidth: 1,
        backgroundColor: '#eee',
        width: 175,
        height: 175
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);