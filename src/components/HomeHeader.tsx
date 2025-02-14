import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { useSearch } from '@/context/SearchContext';
import FilterModal from './FilterModal';
import { useFilter } from '@/context/FilterContext';


const logoDark = require("../../assets/images/logo-dark.png")
const logoLight = require("../../assets/images/logo-light.png")

type CustomHeaderProps = {

    title: any;
    navigation: any;
    showBack: boolean;
    rightComponent?: any
}
export default function HomeHeader() {

    const { theme, colors, toggleTheme } = useTheme()

    const { setSearchTerm, searchTerm } = useSearch()

    const [modalVisible, setModalVisible] = useState(false)
    const {
        selectedContinents,
        selectedTimezones,
        setSelectedContinents,
        setSelectedTimezones
    } = useFilter();

    const handleFilterChange = (type: 'continent' | 'timezone', values: string[]) => {
        if (type === 'continent') {
            setSelectedContinents(values);
        } else {
            setSelectedTimezones(values);
        }
    };

    const hasActiveFilters = selectedContinents.length > 0 || selectedTimezones.length > 0;

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={colors.background} style={theme == 'light' ? "dark" : 'light'} />
            <ThemedView style={styles.header}>
                <FilterModal modalVisible={modalVisible} onClose={() => setModalVisible(false)} selectedContinents={selectedContinents}
                    selectedTimezones={selectedTimezones}
                    onFilterChange={handleFilterChange} />

                {/* Top Header  */}
                <ThemedView style={styles.topContainer}>

                    <ThemedView style={styles.titleContainer}><Image source={theme == 'light' ? logoDark : logoLight} style={{ width: 153.4, height: 50 }} resizeMode='contain' /></ThemedView>

                    {/* Middle (Title) */}
                    <TouchableOpacity onPress={toggleTheme}>
                        <Feather name={theme == 'light' ? "sun" : 'moon'} size={30} color={theme == 'light' ? '#000' : '#fff'} />
                    </TouchableOpacity>

                </ThemedView>
                {/* Search  */}
                <ThemedView style={[styles.searchContainer, { backgroundColor: colors.tint }]}>
                    <Feather name="search" style={styles.searchIcon} size={20} color={theme == 'light' ? '#000' : '#fff'} />
                    <TextInput placeholder='Search Country' style={[styles.searchInput, { color: colors.text }]} placeholderTextColor={theme == 'light' ? "#000" : "#fff"} onChangeText={(text) => setSearchTerm(text)} value={searchTerm} />

                    {searchTerm && (<Feather name="x-circle" size={20} color={theme == 'light' ? '#000' : '#fff'} style={{ alignItems: "flex-end", marginLeft: "auto" }} onPress={() => setSearchTerm("")} />)}

                </ThemedView>

                {/* Bottom Filter and Language  */}
                <ThemedView style={styles.bottomContainer}>

                    <ThemedView style={[styles.bottomContainerIconContainer, styles.languageContainer, { borderColor: colors.text }]}>
                        <Feather name="globe" size={20} color={theme == 'light' ? '#000' : '#fff'} />
                        <ThemedText style={{ fontFamily: 'Axiforma' }}>EN</ThemedText>
                    </ThemedView>
                    <TouchableOpacity style={[styles.bottomContainerIconContainer, styles.filterContainer, { borderColor: colors.text }]} onPress={() => setModalVisible(true)}>
                        <Feather name='filter' size={20} color={theme == 'light' ? '#000' : '#fff'} />
                        <ThemedText style={{ fontFamily: 'Axiforma' }}>Filter {hasActiveFilters ? `(${selectedContinents.length + selectedTimezones.length})` : ''}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        // height: 56,
        // backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 15,
        // elevation: 4,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 2,
    },
    leftContainer: {
        width: 40,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    titleContainer: {
        flex: 1,
        // alignItems: 'center',
    },
    title: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Axiforma'
    },
    // rightContainer: {
    //     width: 40,
    //     alignItems: 'flex-end',
    // },
    topContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: 20,
        paddingHorizontal: 15,
        borderRadius: 5
    },
    searchInput: {
        fontFamily: 'Axiforma',
        width: "100%"
        // position: "relative",
        // textAlign: "center"
    },
    searchIcon: {
        // position: "absolute",

    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    bottomContainerIconContainer: {
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    languageContainer: {


    },
    filterContainer: {


    }
});
