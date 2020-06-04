import React, { Component, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { colorGaztaroaOscuro } from '../comun/comun';
import * as Calendar from 'expo-calendar';

class PruebaEsfuerzo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edad: 18,
            federado: false,
            fecha: '',
            showModal: false
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    gestionarReserva() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            edad: 18,
            federado: false,
            fecha: '',
            showModal: false
        });
    }

    render() {
        return(
        <ScrollView>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Edad</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.edad}
                    onValueChange={(itemValue, itemIndex) => this.setState({edad: itemValue})}>
                    <Picker.Item label="< 20" value="< 20" />
                    <Picker.Item label="20 - 30" value="20 - 30" />
                    <Picker.Item label="31 - 40" value="31 - 40" />
                    <Picker.Item label="41 - 50" value="41 - 50" />
                    <Picker.Item label="51 - 60" value="51 - 60" />
                    <Picker.Item label="> 60" value="> 60" />
                </Picker>
            </View>

            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Federado/No-federado?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.federado}
                    trackColor={colorGaztaroaOscuro}
                    onValueChange={(value) => this.setState({federado: value})}>
                </Switch>
            </View>

            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Día y hora</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.fecha}
                        format=''
                        mode="datetime"
                        placeholder="Seleccionar fecha y hora"
                        minDate="2020-01-01"
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        }}
                        onDateChange={(date) => {this.setState({fecha: date})}}
                    />
            </View>

            <View style={styles.formRow}>
                <Button
                    onPress={() => this.gestionarReserva()}
                    title="Reservar"
                    color={colorGaztaroaOscuro}
                    accessibilityLabel="Gestionar reserva..."
                    />
            </View>

            <Modal animationType = {"slide"} transparent = {false}
                visible = {this.state.showModal}
                onDismiss = {() => {this.toggleModal(); this.resetForm();}}
                onRequestClose = {() => {this.toggleModal(); this.resetForm();}}>
                <View style = {styles.modal}>
                    <Text style = {styles.modalTitle}>Detalle de la reserva</Text>
                    <Text style = {styles.modalText}>Edad: {this.state.edad}</Text>
                    <Text style = {styles.modalText}>Federado?: {this.state.federado ? 'Si' : 'No'}</Text>
                    <Text style = {styles.modalText}>Día y hora: {this.state.fecha}</Text>

                    <Button
                        onPress = {() =>{this.toggleModal(); this.resetForm();}}
                        color={colorGaztaroaOscuro}
                        title="Cerrar"
                        />
                </View>
            </Modal>
        </ScrollView>
        );
    }
};

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
         backgroundColor: colorGaztaroaOscuro,
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default PruebaEsfuerzo;
