import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform, LayoutAnimation, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from './ui/ThemedView'
import { Feather } from '@expo/vector-icons'
import { ThemedText } from './ui/ThemedText'
import { useTheme } from '@/context/ThemeContext'
import { UIManager } from 'react-native'
import CheckBox from './ui/CheckBox'
import { StatusBar } from 'expo-status-bar';

type Props = {
    modalVisible: boolean
    onClose: () => void;
    selectedContinents: string[];
    selectedTimezones: string[];
    onFilterChange: (type: 'continent' | 'timezone', values: string[]) => void;
}

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
const { height, width } = Dimensions.get('window');

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    expanded: boolean;
    onPress: () => void;
    maxHeight?: number

}

const Accordion: React.FC<AccordionProps> = ({
    title,
    children,
    expanded,
    onPress,
    maxHeight
}) => {
    const { colors } = useTheme();

    return (
        <ThemedView style={styles.accordionContainer}>
            <TouchableOpacity
                style={[styles.accordionHeader, { borderColor: colors.text }]}
                onPress={onPress}
            >
                <ThemedText style={styles.accordionTitle}>{title}</ThemedText>
                <Feather
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={colors.text}
                />
            </TouchableOpacity>
            {expanded && (
                <ScrollView
                    style={[
                        styles.accordionContent,
                        maxHeight ? { maxHeight } : undefined
                    ]}
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}
                >
                    {children}
                </ScrollView>
            )}
        </ThemedView>
    );
};


const FilterModal = ({ modalVisible, onClose, selectedContinents, selectedTimezones, onFilterChange }: Props) => {

    const continents = ['Africa', 'Antarctica', 'Asia', 'Australia', 'Europe', 'North America', 'South America'];
    const timezones = ['UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00',
        'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00',
        'UTC-02:00', 'UTC-01:00', 'UTC+00:00', 'UTC+01:00', 'UTC+02:00',
        'UTC+03:00', 'UTC+04:00', 'UTC+05:00', 'UTC+06:00', 'UTC+07:00',
        'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00', 'UTC+12:00'];
    const [expandedContinent, setExpandedContinent] = useState(true);
    const [expandedTimezone, setExpandedTimezone] = useState(false);



    const { colors, theme } = useTheme()
    const toggleAccordion = (section: 'continent' | 'timezone') => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (section === 'continent') {
            setExpandedContinent(!expandedContinent);
            if (!expandedContinent) setExpandedTimezone(false);
        } else {
            setExpandedTimezone(!expandedTimezone);
            if (!expandedTimezone) setExpandedContinent(false);
        }
    };

    const handleContinentToggle = (continent: string) => {
        const newContinents = selectedContinents.includes(continent) ? selectedContinents.filter(r => r !== continent) : [...selectedContinents, continent]

        onFilterChange('continent', newContinents)
    }

    const handleTimezoneToggle = (timezone: string) => {
        const newTimezones = selectedTimezones.includes(timezone) ? selectedTimezones.filter(t => t !== timezone) : [...selectedTimezones, timezone]
        onFilterChange('timezone', newTimezones)
    }

    const clearFilters = () => {
        onFilterChange('continent', []);
        onFilterChange('timezone', []);
    };
    return (

        <Modal visible={modalVisible} animationType='slide' transparent={true} onRequestClose={onClose}>
            <StatusBar backgroundColor={'#FF6C00CC'} style={theme == 'light' ? "dark" : 'light'} />
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <ThemedView style={[styles.modalView]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={e => e.stopPropagation()}
                    >
                        <View style={[styles.modalHeader, { borderBottomColor: colors.tint, paddingBottom: 4 }]}>
                            <ThemedText style={styles.modalTitle}>Filter</ThemedText>
                            <TouchableOpacity onPress={onClose}>
                                <Feather name="x" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>


                        <ScrollView style={styles.modalContent}>
                            <Accordion
                                title="Continent"
                                expanded={expandedContinent}
                                onPress={() => toggleAccordion('continent')}
                            >
                                <ThemedView style={styles.filterOptions}>
                                    {continents.map((continent) => (
                                        <CheckBox key={continent}
                                            title={continent}
                                            isChecked={selectedContinents.includes(continent)}
                                            onPress={() => handleContinentToggle(continent)} />
                                    ))}
                                </ThemedView>
                            </Accordion>

                            <Accordion
                                title="Timezone"
                                maxHeight={300}
                                expanded={expandedTimezone}
                                onPress={() => toggleAccordion('timezone')}
                            >
                                <ScrollView style={styles.filterOptions}>
                                    {timezones.map((timezone) => (
                                        <CheckBox
                                            key={timezone}
                                            title={timezone}
                                            isChecked={selectedTimezones.includes(timezone)}
                                            onPress={() => handleTimezoneToggle(timezone)}
                                        />
                                    ))}
                                </ScrollView>
                            </Accordion>
                        </ScrollView>
                    </TouchableOpacity>
                    <View style={styles.footerButtons}>
                        <TouchableOpacity style={[styles.clearButton, { borderColor: colors.text }]} onPress={clearFilters}><ThemedText>Reset</ThemedText></TouchableOpacity>
                        <TouchableOpacity style={styles.showResultsButton} onPress={onClose}><Text style={{ color: "white", fontFamily: 'Axiforma', fontSize: 16 }}>Show results</Text></TouchableOpacity>
                    </View>
                </ThemedView>
            </TouchableOpacity>
        </Modal>

    )
}

export default FilterModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        // borderWidth: 5
    },
    modalView: {
        // flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        maxHeight: height * 0.8,
        padding: 20,
        // paddingBottom: 50

    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 1,
        // borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Axiforma Bold',
        fontWeight: '500',
    },
    modalContent: {
        padding: 5,
        overflowY: "scroll"
        // flex:1,
    },
    filterSection: {
        marginBottom: 24,
    },
    accordionContainer: {
        marginBottom: 16,
        overflowY: "scroll",
        flex: 1
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        // borderBottomWidth: 1,
    },
    accordionTitle: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Axiforma Bold'
    },
    accordionContent: {
        paddingTop: 12,
    },
    filterOptions: {
        flexDirection: 'column',
        // flexWrap: 'wrap',
        gap: 8,
    },
    filterOption: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        flex: 1
    },
    filterOptionSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    filterOptionTextSelected: {
        color: 'white',
    },
    modalFooter: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    footerButtons: {
        // flex:,
        gap: 15,
        // marginHorizontal: 15,
        // width: width - 40,
        flexDirection: "row",
        // position: "absolute",
        bottom: 10,
        // marginTop: "25%",
        left: 0,
        right: 0

    },
    clearButton: {
        padding: 12,
        width: "30%",
        borderRadius: 6,
        alignItems: 'center',
        borderWidth: 1,
        justifyContent: "center",

    },
    showResultsButton: {
        backgroundColor: "#FF6C00CC",
        width: "65%",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center"
    }

})

//     < TouchableOpacity
// key = { continent }
// style = {
//     [
//     styles.filterOption,
//     { borderColor: colors.border },
//     selectedContinent === continent && styles.filterOptionSelected
//     ]}
// onPress = {() => onFilterSelect?.('continent', continent)}
//                                         >
//     <ThemedText
//         style={[
//             selectedContinent === continent && styles.filterOptionTextSelected
//         ]}
//     >
//         {continent}
//     </ThemedText>
//                                         </ >
