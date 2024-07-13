import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity } from 'react-native';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';

export default function Home({ navigation }) {
  const [nombre, setNombre] = useState(null);
  const ip = Constantes.IP;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/gym_infernus_website/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Sesion');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  const irActualizar = () => {
    navigation.navigate('Productos');
  };

  const EditUser = () => {
    navigation.navigate('UpdateUser');
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/gym_infernus_website/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setNombre(data.name.nombre_cliente);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Infernus Gym Shop</Text>
      </View>
      <Image
        source={require('../../assets/gym-background.jpg')} 
        style={styles.bannerImage}
      />
      <Text style={styles.bannerText}>
        "Infernus Gym Shop es tu destino para encontrar todo lo necesario para potenciar tu rutina de entrenamiento. Descubre nuestra amplia selección que incluye mancuernas, pesas, ropa deportiva, suplementos nutricionales y accesorios así como equipamiento para entrenar en casa. Nuestros productos de alta calidad están diseñados para mejorar tu rendimiento y ayudarte a alcanzar tus metas fitness. ¡Explora el catálogo y lleva tu entrenamiento al siguiente nivel con Infernus Gym Shop!"
      </Text>
      <View style={styles.offersSection}>
        <Text style={styles.offersHeader}>Ofertas</Text>
        <TouchableOpacity onPress={() => { /* acción para Ver todas */ }}>
          <Text style={styles.viewAllText}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.offerCardsContainer}>
        <View style={styles.offerCard}>
          <Image
            source={require('../../assets/offer1.png')} 
            style={styles.offerImage}
          />
          <Text style={styles.offerTitle}>Obtén 50% de descuento en suplementos</Text>
          <Text style={styles.offerSubtitle}>Termina en 24 horas</Text>
          <Text style={styles.offerDiscount}>50% OFF</Text>
        </View>
        <View style={styles.offerCard}>
          <Image
            source={require('../../assets/offer2.png')} 
            style={styles.offerImage}
          />
          <Text style={styles.offerTitle}>Solo hoy 20% de descuento en nuestras pesas</Text>
          <Text style={styles.offerSubtitle}>Termina en 24 horas</Text>
          <Text style={styles.offerDiscount}>20% OFF</Text>
        </View>
        <View style={styles.offerCard}>
          <Image
            source={require('../../assets/offer3.png')} 
            style={styles.offerImage}
          />
          <Text style={styles.offerTitle}>Oferta especial: 60% de descuento</Text>
          <Text style={styles.offerSubtitle}>Termina en 24 horas</Text>
          <Text style={styles.offerDiscount}>60% OFF</Text>
        </View>
        <View style={styles.offerCard}>
          <Image
            source={require('../../assets/offer4.png')} 
            style={styles.offerImage}
          />
          <Text style={styles.offerTitle}>Solo hoy 20% de descuento en ropa deportiva</Text>
          <Text style={styles.offerSubtitle}>Termina en 24 horas</Text>
          <Text style={styles.offerDiscount}>20% OFF</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6D6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  bannerText: {
    padding: 20,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#FFC4C4',
    textAlign: 'center',
  },
  offersSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  offersHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAllText: {
    fontSize: 14,
    color: '#00F',
    textDecorationLine: 'underline',
  },
  offerCardsContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  offerCard: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  offerImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  offerSubtitle: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  offerDiscount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF0000',
    marginTop: 5,
  },
});
