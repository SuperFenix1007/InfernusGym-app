import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';
import Input from '../components/Inputs/Input';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';

export default function SignUp({ navigation }) {
    const ip = Constantes.IP;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');

    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const fechaNueva = `${year}-${month}-${day}`;
        setFechaNacimiento(fechaNueva);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const handleLogout = () => {
        navigation.navigate('Sesion');
    };

    const handleCreate = async () => {
        try {
            const fechaMinima = new Date();
            fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);

            if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() || !dui.trim() || !fechaNacimiento.trim() || !telefono.trim() || !clave.trim() || !confirmarClave.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            } else if (!duiRegex.test(dui)) {
                Alert.alert("El DUI debe tener el formato correcto (########-#)");
                return;
            } else if (!telefonoRegex.test(telefono)) {
                Alert.alert("El teléfono debe tener el formato correcto (####-####)");
                return;
            } else if (date > fechaMinima) {
                Alert.alert('Error', 'Debes tener al menos 18 años para registrarte.');
                return;
            }

            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', email);
            formData.append('direccionCliente', direccion);
            formData.append('duiCliente', dui);
            formData.append('fechaNacimientoCliente', fechaNacimiento);
            formData.append('telefonoCliente', telefono);
            formData.append('claveCliente', clave);
            formData.append('confirmarClave', confirmarClave);

            const response = await fetch(`${ip}/gym_infernus_website/api/services/public/cliente.php?action=signUpMovil`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Crear cuenta</Text>
                <Image source={require('../../assets/gym_infernus_icon.png')} style={styles.logo} />
                <Text style={styles.subHeaderText}>Ingresa tus datos</Text>
                <Input
                    placeHolder='Primer nombre'
                    setValor={setNombre}
                    setTextChange={setNombre}
                />
                <Input
                    placeHolder='Apellido'
                    setValor={setApellido}
                    setTextChange={setApellido}
                />
                <InputEmail
                    placeHolder='Correo electronico'
                    setValor={setEmail}
                    setTextChange={setEmail} />
                <InputMultiline
                    placeHolder='Dirección Cliente'
                    setValor={setDireccion}
                    valor={direccion}
                    setTextChange={setDireccion} />
                <MaskedInputDui
                    dui={dui}
                    setDui={setDui} />
                <View style={styles.contenedorFecha}>
                    <Text style={styles.fecha}>Fecha de Nacimiento</Text>
                    <TouchableOpacity onPress={showDatepicker}><Text style={styles.fechaSeleccionar}>Seleccionar Fecha:</Text></TouchableOpacity>
                    <Text style={styles.fecha}>Seleccion: {fechaNacimiento}</Text>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            minimumDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())}
                            maximumDate={new Date()}
                            onChange={onChange}
                        />
                    )}
                </View>
                <MaskedInputTelefono
                    telefono={telefono}
                    setTelefono={setTelefono} />
                <Input
                    placeHolder='Contraseña'
                    contra={true}
                    setValor={setClave}
                    setTextChange={setClave} />
                <Input
                    placeHolder='Vuelve a repetir la contraseña'
                    contra={true}
                    setValor={setConfirmarClave}
                    setTextChange={setConfirmarClave} />
                <Buttons
                    textoBoton='Registrarse'
                    accionBoton={handleCreate}
                />
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.footerText}>¿Ya tienes cuenta? <Text style={styles.footerLink}>Iniciar Sesión</Text></Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f28b82',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20,
    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    subHeaderText: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    },
    contenedorFecha: {
        backgroundColor: '#A79277',
        color: "#fff",
        fontWeight: '800',
        width: 250,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    fecha: {
        fontWeight: '600',
        color: '#FFF'
    },
    fechaSeleccionar: {
        fontWeight: '700',
        color: '#322C2B',
        textDecorationLine: 'underline'
    },
    footerText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 20,
    },
    footerLink: {
        color: '#ffd700',
        textDecorationLine: 'underline',
    },
});
