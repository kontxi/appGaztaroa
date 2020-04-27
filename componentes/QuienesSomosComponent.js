import React, { Component } from 'react';
import { FlatList, Text, ScrollView } from 'react-native';
import { ListItem, Card } from 'react-native-elements';

import {baseUrl,colorGaztaroaOscuro,colorGaztaroaClaro} from '../comun/comun';
import {connect} from 'react-redux';
import {fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades} from '../redux/ActionCreators';



const mapStateToProps=state=>{
  return{
    actividades: state.actividades
  }
}

function Historia() {

        return(
            <Card
                title='Un poco de historia'>
                <Text style={{margin: 10}}>
                El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
                </Text>
                <Text style={{margin: 10}}>
                Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.
                </Text>
                <Text style={{margin: 10}}>
                Gracias!
                </Text>
            </Card>
        );

}



class QuienesSomos extends Component {


    render(){
        const { navigate } = this.props.navigation;


        const renderCalendarioItem = ({item, index}) => {
            return (

                    <ListItem
                        key={index}
                        title={item.nombre}
                        subtitle={item.descripcion}
                        hideChevron={true}
                        leftAvatar={{ source: { uri: baseUrl + item.imagen } }}
                    />

            );
        }

        return (
         <ScrollView>
         <Historia/>
          <Card
          title='Actividades y recursos'>

          <FlatList

              data={this.props.actividades.actividades}
              renderItem={renderCalendarioItem}
              keyExtractor={item => item.id.toString()}

              />
          </Card>
        </ScrollView>
        );

    };



}

export default connect(mapStateToProps)(QuienesSomos);
