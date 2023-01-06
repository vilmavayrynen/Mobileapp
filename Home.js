import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground
} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';


export default function Home() {

    return (
        <View style={styles.container}>
            <Image
                source={require('./img/header2.jpg')}
                style={styles.headerImage}
            />
            <ImageBackground
                source={require('./img/pic1.jpg')}
                style={styles.container}
                resizeMode='cover'>
                <Card style={styles.card}>
                    <Card.Content>
                        <Paragraph>
                            Discover the beauty secrets of the stars with our app!
                        </Paragraph>
                        <Paragraph></Paragraph>
                        <Paragraph>
                            With our app, you can experiment find the perfect products for your unique beauty.
                            Our app also makes it easy to track beauty salons near by you.
                        </Paragraph>
                        <Paragraph>
                            Happy exploring!
                        </Paragraph>
                    </Card.Content>
                </Card>
            </ImageBackground>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        marginHorizontal: 60,
        backgroundColor: '#ffffff',
    },
    headerImage: {
        width: '100%',
        height: 150,
    }

})