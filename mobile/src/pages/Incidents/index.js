import * as  React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png'

import styles from './styles';

import api from '../../services/api';
//utils
import formatValue from '../../utils/formaNumber';

export default function Incidents() {
    const [incidents, setInsidents] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const [page, setPage] = React.useState(1)
    const [loading, setLoading] = React.useState(false)

    const navitation = useNavigation()

    function navigationDetail(incident) {
        navitation.navigate('Detail', { incident })
    }

    async function loadIncidents() {
        if (loading) return;

        if (total > 0 && incidents.length === total) return;

        setLoading(true)

        const response = await api.get('incidents', { params: { page } });

        setInsidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    React.useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos </Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e sale-o</Text>

            <FlatList
                style={styles.incidentsList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents} //carrega a função quando chegar ao final da lista
                onEndReachedThreshold={0.2} //percentual do final da lista para axecutar a função
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => ( //colocando esse formato "item: incident" passo o valor da variável item para incident
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALUE:</Text>
                        <Text style={styles.incidentValue}>{formatValue.format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigationDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}