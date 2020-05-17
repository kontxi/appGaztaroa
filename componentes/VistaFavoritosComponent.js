import React, { Component } from 'react';
import { FlatList, ScrollView,View, Alert,StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import {baseUrl,colorGaztaroaOscuro,colorGaztaroaClaro} from '../comun/comun';
import {connect} from 'react-redux';
import { borrarFavorito } from '../redux/ActionCreators';



const mapStateToProps=state=>{
  return{
    favoritos:state.favoritos,
    excursiones:state.excursiones

  }
}

const mapDispatchToProps = dispatch => ({
  borrarFavorito: (excursionID) => dispatch(borrarFavorito(excursionID)),


})

class VistaFavoritos extends Component {

   AlertExample=(item)=>{

          Alert.alert(
          'Borrar excursión favorita?',
          'Confirme que desea borrar la excursión:'+ item.nombre,
          [

            {
              text: 'Cancelar',
              onPress: () => console.log(item.nombre+'Favorito no borrado'),
              style: 'cancel'
            },
            { text: 'OK', onPress: () =>{this.props.borrarFavorito(item.id)} }
          ],
          { cancelable: false }


          );
      }





    render(){
        const { navigate } = this.props.navigation;

        const renderFavoritoItem = ({item, index}) => {

          const rightButton=[
            {
              text:'Borrar',
              type:'delete',
              onPress: () =>{this.AlertExample(item);}

            }
          ];



            return (

                <Swipeout right={rightButton} autoClose={true}>

                    <ListItem
                        key={index}
                        title={item.nombre}
                        subtitle={item.descripcion}
                        hideChevron={true}
                        onPress={() =>console.log(item.id), navigate('DetalleExcursion', { excursionId: item.id })}
                        leftAvatar={{ source: { uri: baseUrl + item.imagen } }}
                    />
                </Swipeout>


            );

        }


                    return (

                            <FlatList
                            data={this.props.excursiones.excursiones.filter(favorito => this.props.favoritos.some(el => el === favorito.id))}
                            renderItem={renderFavoritoItem}
                            keyExtractor={item => item.id.toString()}
                          />


                    );




    };
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
          justifyContent: 'center',
          margin: 20
       },
       modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }


});

export default connect(mapStateToProps,mapDispatchToProps)(VistaFavoritos);
