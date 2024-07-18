import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import Buttons from '../components/Buttons/Button';
import CarritoCard from '../components/CarritoCard/CarritoCard';
import ModalEditarCantidad from '../components/Modales/ModalEditarCantidad';

const Carrito = ({ navigation }) => {
  const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);
  const [idDetalle, setIdDetalle] = useState(null);
  const [cantidadProductoCarrito, setCantidadProductoCarrito] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const ip = Constantes.IP;

  const backProducts = () => {
    navigation.navigate('Productos');
  };

  useFocusEffect(
    React.useCallback(() => {
      getDetalleCarrito();
    }, [])
  );

  const getDetalleCarrito = async () => {
    try {
      const response = await fetch(`${ip}/gym_infernus_website/api/services/public/pedido.php?action=readDetail`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setDataDetalleCarrito(data.dataset);
      } else {
        console.log("No hay detalles del carrito disponibles");
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al listar las categorias');
    }
  };

  const finalizarPedido = async () => {
    if (dataDetalleCarrito.length === 0) {
      Alert.alert('Error', 'No hay productos en el carrito para pagar.');
      return;
    }

    try {
      const response = await fetch(`${ip}/gym_infernus_website/api/services/public/pedido.php?action=finishOrder`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        Alert.alert("Se finalizó la compra correctamente");
        setDataDetalleCarrito([]);
        navigation.navigate('TabNavigator', { screen: 'Productos' });
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al finalizar pedido');
    }
  };

  const handleEditarDetalle = (idDetalle, cantidadDetalle) => {
    setModalVisible(true);
    setIdDetalle(idDetalle);
    setCantidadProductoCarrito(cantidadDetalle);
  };

  const renderItem = ({ item }) => (
    <CarritoCard
      item={item}
      cargarCategorias={getDetalleCarrito}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      setCantidadProductoCarrito={setCantidadProductoCarrito}
      cantidadProductoCarrito={cantidadProductoCarrito}
      idDetalle={idDetalle}
      setIdDetalle={setIdDetalle}
      accionBotonDetalle={handleEditarDetalle}
      getDetalleCarrito={getDetalleCarrito}
      updateDataDetalleCarrito={setDataDetalleCarrito}
    />
  );

  const calcularTotal = () => {
    return dataDetalleCarrito.reduce((total, item) => total + item.precio_producto * item.cantidad, 0);
  };

  return (
    <View style={styles.container}>
      <ModalEditarCantidad
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        idDetalle={idDetalle}
        setIdDetalle={setIdDetalle}
        setCantidadProductoCarrito={setCantidadProductoCarrito}
        cantidadProductoCarrito={cantidadProductoCarrito}
        getDetalleCarrito={getDetalleCarrito}
      />

      <Text style={styles.title}>Carrito de Compras</Text>

      {dataDetalleCarrito.length > 0 ? (
        <FlatList
          data={dataDetalleCarrito}
          renderItem={renderItem}
          keyExtractor={(item) => item.detalle_pedido_id.toString()}
        />
      ) : (
        <Text style={styles.titleDetalle}>No hay detalles del carrito disponibles.</Text>
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Final</Text>
        <Text style={styles.totalAmount}>{calcularTotal()}$</Text>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={finalizarPedido}>
        <Text style={styles.payButtonText}>Ir a pagar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/dumbbell.png' }}
          style={styles.footerImage}
        />
        <Text style={styles.footerText}>Infernus Gym Shop</Text>
      </View>
    </View>
  );
};

export default Carrito;

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
    color: '#5C3D2E',
  },
  titleDetalle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#AF8260',
    backgroundColor: '#F4E4D9',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5C3D2E',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5C3D2E',
  },
  payButton: {
    backgroundColor: '#AF8260',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F4E4D9',
  },
  footerImage: {
    width: 48,
    height: 48,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5C3D2E',
    marginTop: 8,
  },
});
