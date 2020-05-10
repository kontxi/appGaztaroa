import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,StyleSheet } from 'react-native';
import { Card, Icon, Button, Input } from 'react-native-elements';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import {baseUrl,colorGaztaroaOscuro,colorGaztaroaClaro} from '../comun/comun';
import {connect} from 'react-redux';
import {Modal} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';

const mapStateToProps=state=>{
  return{
    excursiones:state.excursiones,
    comentarios:state.comentarios,
    favoritos:state.favoritos,

  }
}
const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (comentario) => dispatch(postComentario(comentario))

})



function RenderExcursion(props) {


    const excursion = props.excursion;
    const showModal=props.showModal;


    if (excursion != null) {
        return(
            <Card
            featuredTitle={excursion.nombre}
            image={{uri: baseUrl + excursion.imagen}}>
                <Text style={{margin: 10}}>
                    {excursion.descripcion}
                </Text>
                  <View style={styles.formRow}>
                        <Icon
                                raised
                                reverse
                                name={ props.favorita ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                        />
                        <Icon
                                raise
                                reverse
                                name={ props.Comentarios ? 'pencil' : 'pencil'}
                                type='font-awesome'
                                color='#015afc'
                                onPress={() =>props.comentarios ? console.log('Pon tu comentario'): props.onPress()}
                        />
                    </View>
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComentario(props){
  const comentarios = props.comentarios;

  const renderCommentarioItem = ({item, index}) =>{
       return(
         <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comentario}</Text>
                <Text style={{fontSize: 12}}>{item.valoracion} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.autor + ', ' + item.dia} </Text>
            </View>


      );
    };
       return(
         <Card title='Comentarios' >
            <FlatList
                data={comentarios}
                renderItem={renderCommentarioItem}
                keyExtractor={item => item.id.toString()}
                />

        </Card>



       );

   }





class DetalleExcursion extends Component {
  constructor(props) {
      super(props);

      this.state = {
        showModal:false,
          comentario:"",
          autor:"",
          valoracion:3



      }
  }
  gestionarComentario(excursionId){
    console.log(JSON.stringify(this.state));
    var date = new Date().getDate(); //Current Date
     var month = new Date().getMonth() + 1; //Current Month
     var year = new Date().getFullYear(); //Current Year
     var date = new Date().getDate(); //To get the Current Date
     var hours = new Date().getHours(); //To get the Current Hours
      var min = new Date().getMinutes(); //To get the Current Minutes
      var sec = new Date().getSeconds();
      var milsec=new Date().getMilliseconds(); //To get the Current Seconds


     var dia= year + '-' + month + '-'+date+'T'+hours+':'+min+':'+sec+'.'+ milsec
    const comentario=[{
      id:50, excursionId: excursionId, comentario:this.state.comentario,autor:this.state.autor,valoracion:this.state.valoracion,dia:dia
    }]
    this.props.postComentario(comentario)


  }

  resetForm(){
    this.setState({
      showModal:false,
      comentario:"",
      autor:""

    });
  }


    marcarFavorito(excursionId){
      this.props.postFavorito(excursionId);
     }
     toggleModal(){
       this.setState({showModal:!this.state.showModal});
     }

     ratingCompleted=rating=> {
       rating=+rating;

       console.log("Rating is: " , rating);
        this.setState({valoracion:rating});

     }


    render(){
      const {excursionId} = this.props.route.params;
      const { rating } = this.props;


      return(
            <ScrollView>
            <RenderExcursion
                excursion={this.props.excursiones.excursiones[+excursionId]}
                favorita={this.props.favoritos.some(el => el === excursionId)}
                onPress={() => {this.marcarFavorito(excursionId); this.toggleModal(this.state.showModal);}}
              />

                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(); this.resetForm();}}
                    onRequestClose = {() => {this.toggleModal(); this.resetForm();}}>
                    <View style = {styles.modal}>

                    <Rating

                        ratingCount={5}
                        fractions={0}
                        startingValue={3}
                        imageSize={40}
                        onFinishRating={this.ratingCompleted}
                        showRating
                        style={{ paddingVertical: 10 }}
                  />


                    <Input
                         placeholder="Author"
                         leftIcon={{ type: 'font-awesome', name: 'user' }}
                         style={styles}
                         onChangeText={value => this.setState({autor: value })}
                    />

                      <Input
                           placeholder="Comment"
                           leftIcon={{ type: 'font-awesome', name: 'comment' }}
                           style={styles}
                           onChangeText={value => this.setState({comentario: value })}
                      />


                        <Button
                            onPress = {() =>{this.gestionarComentario(excursionId,rating), this.toggleModal(), this.resetForm()}}
                            type='clear'
                            title="ENVIAR"
                            />

                            <Button
                                onPress = {() =>{this.resetForm(), this.toggleModal()}}
                                type='clear'
                                title="CANCELAR"
                            />
                    </View>
                </Modal>
            </ScrollView>
              );

        }
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

    export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
