import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes'

const CarritoCard = ({item, cargarCategorias, 
  modalVisible,
  setModalVisible,
  cantidadProductoCarrito,
  setCantidadProductoCarrito, 
  accionBotonDetalle,
  idDetalle,
  setIdDetalle, getDetalleCarrito, updateDataDetalleCarrito}) => {

    const ip = Constantes.IP;
    //asignar el valor a cantidadproducto carrito que viene 
  
/*
    const handleDeleteDetalleCarrito = async (idDetalle) => {
      try {
        const formData = new FormData();
        formData.append('idDetalle', idDetalle);
        const response = await fetch(`${ip}/coffeeshop/api/services/public/pedido.php?action=deleteDetail`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.status) {
          Alert.alert('Datos eliminados correctamente del carrito');
          // Llamar a la función de actualización para actualizar la lista
          updateDataDetalleCarrito(prevData => prevData.filter(item => item.id_detalle !== idDetalle));
        } else {
          Alert.alert('Error al eliminar del carrito', data.error);
        }
      } catch (error) {
        Alert.alert("Error al eliminar del carrito")
      }
    };*/
    
    const handleDeleteDetalleCarrito = async (idDetalle) => {
      try {
        // Mostrar un mensaje de confirmación antes de eliminar
        Alert.alert(
          'Confirmación',
          '¿Estás seguro de que deseas eliminar este elemento del carrito?',
          [
            {
              text: 'Cancelar',
              style: 'cancel'
            },
            {
              text: 'Eliminar',
              onPress: async () => {
                const formData = new FormData();
                formData.append('idDetalle', idDetalle);
                const response = await fetch(`${ip}/gym_infernus_website/api/services/public/pedido.php?action=deleteDetail`, {
                  method: 'POST',
                  body: formData
                });
                const data = await response.json();
                if (data.status) {
                  Alert.alert('Datos eliminados correctamente del carrito');
                  // Llamar a la función de actualización para actualizar la lista
                  updateDataDetalleCarrito(prevData => prevData.filter(item => item.detalle_pedido_id !== idDetalle));
                } else {
                  Alert.alert('Error al eliminar del carrito', data.error);
                }
              }
            }
          ]
        );
      } catch (error) {
        Alert.alert("Error al eliminar del carrito")
      }
    };
     

  return (
    <View style={styles.itemContainer}>

    <Text style={styles.itemText}>ID: {item.detalle_pedido_id}</Text>
    <Text style={styles.itemText}>Nombre: {item.nombre_producto}</Text>
    <Text style={styles.itemText}>Precio: ${item.precio_producto}</Text>
    <Text style={styles.itemText}>Cantidad: {item.cantidad}</Text>
    <Text style={styles.itemText}>SubTotal: ${(parseFloat(item.cantidad)*parseFloat(item.precio_producto)).toFixed(2)}</Text>

    <TouchableOpacity style={styles.modifyButton}
    onPress={()=>accionBotonDetalle(item.detalle_pedido_id, item.cantidad)}
    >
      <Text style={styles.buttonText}>Modificar Cantidad</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.deleteButton}
    onPress={()=>handleDeleteDetalleCarrito(item.detalle_pedido_id)}
    >
      <Text style={styles.buttonText}>Eliminar del carrito</Text>
    </TouchableOpacity>
  </View>

  );
};

export default CarritoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E', // Brown color for the title
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  modifyButton: {
    borderWidth: 1,
    borderColor: '#8F6B58',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#8F6B58', // Light brown color for modify button
    marginVertical: 4,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#D2691E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#D2691E', // Darker orange color for delete button
    marginVertical: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  finalButton: {
    backgroundColor: '#A0522D', // Sienna color for final action buttons
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  finalButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerButtons:{
    justifyContent:'center',
    alignItems:'center', 
  }
});
