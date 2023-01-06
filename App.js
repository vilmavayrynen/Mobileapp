import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './Home';
import Search from './Search';
import Map from './Map';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <View style={styles.container}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'App') {
                  iconName = 'home-outline';
                } else if (route.name === 'Search') {
                  iconName = 'search-outline';
                } else if (route.name === 'Map') {
                  iconName = 'pin-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}>
            <Tab.Screen 
              name='App' 
              component={Home} 
              options={{ 
                headerShown: false 
              }} 
            />
            <Tab.Screen 
              name='Search' 
              component={Search} 
              options={{ 
                headerShown: false 
              }} 
            />
            <Tab.Screen 
              name='Map' 
              component={Map} 
              options={{ 
                headerShown: false, 
              }} 
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
