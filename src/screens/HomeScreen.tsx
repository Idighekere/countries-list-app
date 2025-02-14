import { FlatList, Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import countriesData from "../data/countries.json";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ICountryDetails } from '../types/country';
import { ThemedView } from '../components/ui/ThemedView';
import { ThemedText } from '../components/ui/ThemedText';
import { useSearch } from '@/context/SearchContext';
import LoadingScreen from './LoadingScreen';
import { groupByFirstLetter } from '../utils/countries';
import { useFilter } from '@/context/FilterContext';
type Props = {}

const HomeScreen = ({ navigation }) => {

  const [countries, setCountries] = useState<ICountryDetails[]>([])
  const [loading, setLoading] = useState(true)
  const { searchTerm } = useSearch()
  const { selectedContinents, selectedTimezones } = useFilter()

  useEffect(() => {

    const fetchCountries = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,capital,flags,timezones,region,continents`)
        // const response = await fetch(require('../data/countries.json'))
        const data = await response.json()
        // console.log(data)

const removeAntarctica=data.filter((d)=>d.name.common!=='Antarctica')
        setCountries(removeAntarctica)



      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCountries()

    return () => {

    }
  }, [])

  const filteredAndGroupedCountries = useMemo(() => {
    // First, filter countries based on search term and selected filters
    const filtered = countries.filter(country => {
      // Search term filter
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm?.toLowerCase() || '')

      // Continent filter
      const matchesContinent = selectedContinents.length === 0 ||
        selectedContinents.includes(country?.continents[0])

      // Timezone filter
      const matchesTimezone = selectedTimezones.length === 0 ||
        country.timezones.some(timezone =>
          selectedTimezones.includes(timezone)
        )

      return matchesSearch && matchesContinent && matchesTimezone
    })

    //Transform countries into section based on first letter
    const sectionedCountries = groupByFirstLetter(filtered)
    const sortedCountries = sectionedCountries.sort((a, b) => a.title.localeCompare(b.title))
    return sortedCountries

  }, [countries, searchTerm, selectedContinents, selectedTimezones])
  const handleNavigate = (countryName: string) => {
    navigation.navigate('Details', { countryName })
  }
  // const filteredCountries = countries?.filter((country) => country?.name?.common?.toLowerCase().includes(searchTerm?.toLowerCase()))

  const renderItem = ({ item }) => {

    // console.log(item)
    return (<TouchableOpacity style={styles.item} onPress={() => handleNavigate(item?.name?.common)}>
      <Image source={{ uri: item?.flags?.png }} style={styles.flag} />
      <ThemedView style={{ flexDirection: "column", alignItems: 'flex-start', gap: -10 }}>

        <ThemedText style={styles.title}>{item.name.common}</ThemedText>
        <ThemedText style={styles.capital}>{item?.capital![0]}</ThemedText>
      </ThemedView>

    </TouchableOpacity>
    );
  }

  const renderSectionHeader = ({ section: { title } }) => (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.headerTitle}>{title}</ThemedText>
    </ThemedView>
  );


  const renderEmptyList = () => (
    <ThemedView style={styles.emptyContainer}>
      <ThemedText style={styles.emptyText}>
        No countries found matching your criteria
      </ThemedText>
    </ThemedView>
  )


  if(loading){
    return (<LoadingScreen loading={loading} />)

  }


if(filteredAndGroupedCountries.length==0){
  return renderEmptyList()
}

  return (


    <ThemedView style={{ flex: 1 }}>
      <LoadingScreen loading={loading} />

      <SectionList sections={filteredAndGroupedCountries}
        keyExtractor={(item, index) => item.name.common}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ gap: 10 }}
        stickySectionHeadersEnabled
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
      {/* <FlatList data={filteredCountries}
        renderItem={renderItem}
        keyExtractor={(item) => item.name?.common}
      /> */}

    </ThemedView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,

  },
  title: {
    // borderWidth: 2,
    marginVertical: 0,
    lineHeight: 15,
    borderColor: "white",
    fontFamily:'Axiforma'
  },
  headerTitle: {
    fontFamily:'Axiforma'
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 16,
    alignItems: "center"
  },
  flag: {
    width: 40,
    height: 40,
    borderRadius: 10
  },
  capital: {
    fontSize: 14,
    opacity: 0.7,
    fontFamily:'Axiforma',
    // borderWidth: 3,
    lineHeight: 14,
  }, emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    fontFamily:'Axiforma'
  },

})
