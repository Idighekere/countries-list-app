import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ui/ThemedView'
import { ThemedText } from '@/components/ui/ThemedText'
import { useTheme } from '@/context/ThemeContext'

const LoadingScreen = ({ loading }: { loading: boolean }) => {

    const { theme } = useTheme()

    if (!loading) return null

    return (
        <SafeAreaView>

            <Modal visible={loading} transparent={true}>

                <ThemedView style={styles.container}>
                    <ActivityIndicator size='large' color={theme == 'light' ? '#000' : '#fff'} />
                    <ThemedText style={styles.loadingText}>Loading...</ThemedText>
                </ThemedView>
            </Modal>
        </SafeAreaView>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        zIndex: 1000,
        justifyContent: "center",
        alignItems: 'center',

    }, loadingText: {
        textAlign: "center",
        fontWeight: "semibold",
        fontSize: 16
    }
})
