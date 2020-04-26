import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { View, Image, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,   DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { colorGaztaroaClaro,colorGaztaroaOscuro} from '../comun/comun';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CalendarioNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Calendario"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Calendario"
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa',
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: 'Detalle Excursión',
        }}
      />
    </Stack.Navigator>
  );
}
function HomeNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro},
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Campo Base',
        }}

      />
    </Stack.Navigator>
  );
}
function ContactoNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Contacto"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro},
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Contacto"
        component={Contacto}
        options={{
          title: 'Contacto',
        }}
      />

    </Stack.Navigator>
  );
}
function HistoriaNavegador({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Historia"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>),
}}


    >
      <Stack.Screen
        name="Historia"
        component={QuienesSomos}
        options={{
          title: 'Quiénes somos',
        }}
      />

    </Stack.Navigator>
  );
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./imagenes/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </DrawerContentScrollView>

  );
}


function DrawerNavegador() {
  return (
      <Drawer.Navigator
      drawerStyle={{
        backgroundColor: colorGaztaroaClaro,
      }}
      initialRouteName="Home"
      drawerContent={props=><CustomDrawerContent{...props}/>}
    >
        <Drawer.Screen name="Campo Base" component={HomeNavegador} options={{
          drawerIcon: ({ tintColor}) => (
            <Icon
            name='home'
            type='font-awesome'
            size={22}
            color={tintColor}
            />
          )
          }} />
        <Drawer.Screen name="Quiénes somos" component={HistoriaNavegador} options={{
          drawerIcon: ({ tintColor}) => (
            <Icon
            name='info-circle'
            type='font-awesome'
            size={22}
            color={tintColor}
            />
          )
          }}/>
        <Drawer.Screen name="Calendario" component={CalendarioNavegador} options={{
          drawerIcon: ({ tintColor}) => (
            <Icon
            name='calendar'
            type='font-awesome'
            size={22}
            color={tintColor}
            />
          )
          }}/>
        <Drawer.Screen name="Contacto" component={ContactoNavegador} options={{
          drawerIcon: ({ tintColor}) => (
            <Icon
            name='address-card'
            type='font-awesome'
            size={22}
            color={tintColor}
            />
          )
          }}/>

      </Drawer.Navigator>
  );
}



class Campobase extends Component {

  render() {

    return (
      <NavigationContainer>
      <View style={{flex:1, paddingTop: Platform.OS === 'android' ? 0 : Constants.statusBarHeight }}>

            <DrawerNavegador Style={{
                    backgroundColor: colorGaztaroaClaro,
                  }}
                  initialRouteName="Home"

          />
                <Drawer.Screen name="Contacto" component={ContactoNavegador}

                  />

          </View>
        </NavigationContainer>

    );
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});



export default Campobase;