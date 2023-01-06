import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SectionList
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';


export default function Home() {

    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState([]);

    const fetchRepositories = () => {
        fetch('http://makeup-api.herokuapp.com/api/v1/products.json?brand=' + keyword)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => Alert.alert('Error', err))
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textinput}
                label="Type the name of the brand..."
                value={keyword}
                type='outlined'
                onChangeText={text => setKeyword(text)}
                returnKeyType="search"
            />
            <Button
                style={styles.button}
                mode='elevated'
                onPress={fetchRepositories}>
                Find
            </Button>

            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={styles.productBox}>
                        <Text style={styles.productText}>
                            {item.name}
                        </Text>
                        <Text style={styles.productType}>
                            Product type: {item.product_type}
                        </Text>
                    </View>
                }
            />

            <SectionList
                sections={[
                    { title: 'A', data: ['Almay', 'Alva', 'Anna Sui', 'Annabelle'] },
                    { title: 'B', data: ['Benefit', 'Boosh', 'Burts Bees', 'Butter London'] },
                    { title: 'C', data: ['Cest moi', 'Cargo Cosmetics', 'China Glaze', 'Clinique', 'Coastal Classic Creation', 'Colourpop', 'Covergirl'] },
                    { title: 'D', data: ['Dalish', 'Deciem', 'Dior', 'Dr. Hauschka'] },
                    { title: 'E', data: ['E.l.f', 'Essie'] },
                    { title: 'F', data: ['Fenty'] },
                    { title: 'G', data: ['Glossier', 'Green people'] },
                    { title: 'I', data: ['Iman'] },
                    { title: 'L', data: ['Loreal', 'Lotus Cosmetics USA'] },
                    { title: 'M', data: ['Maias Mineral Galazy', 'Marcelle', 'Marienatie', 'Maybelline', 'Milani', 'Mineral Fusion', 'Misa', 'Mistura', 'Moov'] },
                    { title: 'N', data: ['Nudus', 'NYX'] },
                    { title: 'O', data: ['Orly'] },
                    { title: 'P', data: ['Pacifica', 'Penny Lane Organics', 'Physicians formula', 'Piggy Paint', 'Pure Anada'] },
                    { title: 'R', data: ['Rejuva Minerals', 'Revlon'] },
                    { title: 'S', data: ['Sally Bs Skin Yummies', 'Salon Perfect', 'Sante', 'Sinful Colours', 'Smashbox', 'Stila', 'Suncoat'] },
                    { title: 'W', data: ['W3llpeople', 'Wen n Wild'] },
                    { title: 'Z', data: ['Zorah', 'Zorah Biocosmetiques'] },
                ]}
                renderItem={({ item }) => <Text style={styles.sectionItem}>{item}</Text>}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}

            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff'
    },
    textinput: {
        fontSize: 16,
        marginTop: 50,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#ffffff',
        height: 65,
    },
    button: {
        marginTop: 20,
        marginBottom: 15,
        width: 100,
        marginLeft: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    productBox: {
        marginTop: 20,
        marginBottom: 20,
    },
    productText: {
        fontSize: 16,
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontWeight: 'bold'
    },
    productType: {
        paddingLeft: 10
    },
    productName: {
        paddingLeft: 10
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#f5f5f5'
    },
    sectionItem: {
        padding: 10,
        fontSize: 16,
        height: 44,
    },

})