import { View, Text, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {
    const handleContinue = () => {
        navigation.navigate('Main');
    };

    return (
        <LinearGradient
            style={{
                flex: 1,
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require('../assets/hero1.jpg')}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: 'absolute',
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: '-15deg' },
                            ],
                        }}
                    />

                    <Image
                        source={require('../assets/hero3.jpg')}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: 'absolute',
                            top: -30,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: '-5deg' },
                            ],
                        }}
                    />

                    <Image
                        source={require('../assets/hero2.jpg')}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            position: 'absolute',
                            top: 130,
                            left: -50,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: '15deg' },
                            ],
                        }}
                    />

                    <Image
                        source={require('../assets/doorbell.png')}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: 'absolute',
                            top: 110,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: '-10deg' },
                            ],
                        }}
                    />
                </View>

                {/* content  */}

                <View
                    style={{
                        paddingHorizontal: 22,
                        position: 'absolute',
                        top: 400,
                        width: '100%',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 50,
                            fontWeight: 800,
                            color: COLORS.white,
                        }}
                    >
                        Let's Get
                    </Text>
                    <Text
                        style={{
                            fontSize: 46,
                            fontWeight: 800,
                            color: COLORS.white,
                        }}
                    >
                        Started
                    </Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: COLORS.white,
                                marginVertical: 4,
                            }}
                        >
                            Enjoy the Smart Doorbell experience!
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: COLORS.white,
                            }}
                        >
                            Our smart doorbell uses advanced facial recognition to
                            ensure your home stays secure.
                        </Text>
                    </View>

                    <Button
                        title="Continue"
                        onPress={handleContinue}
                        style={{
                            marginTop: 22,
                            width: '100%',
                        }}
                    />
                </View>
            </View>
        </LinearGradient>
    );
};

export default Welcome;
