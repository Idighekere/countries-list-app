import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { ThemedView } from './ui/ThemedView'
import { ThemedText } from './ui/ThemedText'
import { useTheme } from '@/context/ThemeContext'
import { StatusBar } from 'expo-status-bar'

type Props = {}

const DetailsHeader = ({ title, navigation }: Props) => {

    const { colors, theme } = useTheme()
    const handleBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar backgroundColor={colors.background} style={theme == 'light' ? "dark" : 'light'} />
            <ThemedView style={styles.container}>

                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Feather name="arrow-left" size={30} color={colors.text} />
                </TouchableOpacity>

                <ThemedView style={styles.titleContainer}>
                    <ThemedText style={styles.title}>{title}</ThemedText>
                </ThemedView>
                {/* <View>

                </View> */}
            </ThemedView>
        </SafeAreaView>
    )
}

export default DetailsHeader

const styles = StyleSheet.create({
    safe: {
        // flex: 1,
        // paddingHorizontal: 20,
        // borderWidth: 2
    },
    container: {

        flexDirection: "row",
        alignItems: "center",
        // flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "center"
    },
    backButton: {
        alignItems: "flex-start"
    },
    titleContainer: {
        flex: 1
    }, title: {
        textAlign: "center",
        fontSize: 17,
fontFamily:'Axiforma'    }
})
