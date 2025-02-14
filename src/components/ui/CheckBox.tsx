import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from './ThemedText';

type Props = {
    isChecked: boolean
    onPress: () => void;
    title: string
}

const CheckBox = ({ isChecked, onPress, title }: Props) => {
    const iconName = isChecked ?
        "checkbox-marked" : "checkbox-blank-outline";

    const { colors } = useTheme()
    return (
        <View style={styles.container}>
                <ThemedText style={styles.title}>{title}</ThemedText>
            <Pressable onPress={onPress}>
                <MaterialCommunityIcons
                    name={iconName} size={24} color={colors.text} />
            </Pressable>
        </View>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        marginTop: 5,
        // marginHorizontal: 5,
    },
    title: {
        fontSize: 16,
        fontFamily:'Axiforma'
        // color: "#000",
        // marginLeft: 5,
        // fontWeight: "600",
    }
})
