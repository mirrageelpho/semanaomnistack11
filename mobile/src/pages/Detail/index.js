import * as  React from 'react';
import { Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';

import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';
//utils
import formatValue from '../../utils/formaNumber';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const { incident } = route.params;
    
    const message = `
    Olá ${incident.name}. Estou ajudando o caso 
    ${incident.title}, com o valor de 
    ${formatValue.format(incident.value)}
    `

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.whatsapp],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.fone}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity
                    style={styles.headerText}
                    onPress={navigateBack}
                >
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, , { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALUE:</Text>
                <Text style={styles.incidentValue}>{formatValue.format(incident.value)}</Text>


            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso</Text>
                <Text style={styles.heroDescription}>Seja o herói desse caso</Text>

                <View style={styles.actions}>

                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendWhatsapp}
                    >
                        <Text style={styles.actionText} >Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendMail}
                    >
                        <Text style={styles.actionText} >E-mail</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}