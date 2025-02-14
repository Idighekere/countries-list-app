import { Dimensions, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ICountryDetails } from '../types/country'
import LoadingScreen from './LoadingScreen'
import { ThemedView } from '@/components/ui/ThemedView'
import { ThemedText } from '@/components/ui/ThemedText'


interface Props {
    navigation: any;
    route: {
        params: {
            countryName: string;
        };
    };
}

const initialCountryDetails: ICountryDetails = {
    name: { common: '', official: '' },
    capital: [],
    flags: { png: '', svg: '', alt: '' },
    currencies: {},
    region: '',
    languages: {},
    area: 0,
    maps: { googleMaps: '', openStreetMaps: '' },
    population: 0,
    car: { side: '', signs: [] },
    timezones: [],
    idd: { root: '', suffixes: [] },
    continents: []
};

const CountryDetailsScreen = ({ route }: Props) => {

    const { countryName } = route.params;
    const [countryDetails, setCountryDetails] = useState<ICountryDetails>(initialCountryDetails)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([])

    const { width } = useWindowDimensions()
    useEffect(() => {
        const fetchCountries = async () => {
            if (!countryName) return;

            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,flags,currencies,region,languages,area,maps,population,car,timezones,idd,continents`)
                // const response = await fetch(require('../data/countries.json'))
                if (!response.ok) {
                    throw new Error('Failed to fetch country details');
                }

                const data = await response.json();
                if (data && data[0]) {
                    setCountryDetails(data[0]);

                    setImages([data[0].maps.openStreetMaps, data[0].maps.googleMaps, data[0].flags.png])
                    console.log(images)
                } else {
                    setError('No country data found');
                }

            } catch (error) {
                console.error(error)
                setError(error instanceof Error ? error.message : 'An error occurred');

            } finally {
                setLoading(false)
            }
        }
        fetchCountries()

        return () => {

        }
    }, [])



    const formatCurrencies = (): string => {
        if (!countryDetails?.currencies) return ''

        try {
            return Object.values(countryDetails.currencies)
                .map(currency => `${currency?.name} (${currency?.symbol})`)
                .filter(Boolean)
                .join(', ')
        } catch (error) {
            console.error('Error formatting currencies:', error)
            return ''
        }
    }

    const formatLanguages = (): string => {
        if (!countryDetails?.languages) return ''

        try {
            return Object.values(countryDetails?.languages)
                .map(language => `${language}`)
                .filter(Boolean)
                .join(', ')
        } catch (error) {
            console.error('Error formatting currencies:', error)
            return ''
        }
    }

    const formatCountryCode = (): string => {
        if (!countryDetails?.idd?.root || !countryDetails?.idd?.suffixes) return ''
        return `${countryDetails.idd.root}${countryDetails.idd.suffixes[0] || ''}`
    }
    if (loading) {
        return <LoadingScreen loading={loading} />

    }

    if (error) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText style={styles.errorText}>{error}</ThemedText>
            </ThemedView>
        );
    }


    return (


        <ThemedView style={styles.container}>
            <LoadingScreen loading={loading} />
            <ThemedView style={{ width: width - 40, }}>
                <Image source={{ uri: countryDetails?.flags?.png }} style={[styles.flag, {}]} resizeMode='cover' />
            </ThemedView>
            <ThemedView style={{ gap: 2, marginTop: 30 }}>
                <RowInfo label='Population' text={countryDetails?.population?.toLocaleString()} />

                <RowInfo label={'Region'} text={countryDetails?.region} />
                <RowInfo label='Capital' text={countryDetails?.capital?.length ? countryDetails.capital[0] : ''} />

                <SeperatorGap />
                <RowInfo label='Official language' text={formatLanguages()} />

                <RowInfo label='Full Name' text={countryDetails?.name?.official || countryDetails?.name?.common} />
                {/* <SeperatorGap /> */}



                <SeperatorGap />
                <RowInfo label={'Area'} text={countryDetails?.area ? `${countryDetails?.area?.toLocaleString()} km²` : ''} />
                <RowInfo label='Currency' text={formatCurrencies()} />

                <SeperatorGap />

                <RowInfo label='Time zone' text={countryDetails?.timezones[0]} />
                <RowInfo label='Dailing Code' text={formatCountryCode()} />
                <RowInfo label='Driving Side' text={countryDetails?.car?.side} />

            </ThemedView>
        </ThemedView>

    )
}

const RowInfo = ({ label, text }: { label: string; text: string | number | undefined }) => {

    if (!text && text !== 0) return null

    return (
        <ThemedView style={styles.rowContainer}>
            <ThemedText style={[styles.label, styles.text]}>{label}:</ThemedText><ThemedText style={styles.text}>{text}</ThemedText>
        </ThemedView>)
}

const SeperatorGap = () => {

    return <ThemedView style={{ height: 10, width: "100%" }} ></ThemedView>
}

export default CountryDetailsScreen

const styles = StyleSheet.create({
    container: {

        flex: 1,

        paddingHorizontal: 20,
        paddingVertical: 10,
        // alignItems: "center"
    },
    rowContainer: {
        width: Dimensions.get('window').width - 40,
        flexDirection: "row",
        gap: 5,
        flexWrap: 'wrap',

    },
    text: {
        fontSize: 16,
        // wordWrap: '',
    },
    label: {
        fontFamily: "Axiforma Bold",
        // fontWeight: "bold"
    },
    flag: {

        aspectRatio: 2 / 1,
        borderRadius: 10
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: 'red',
    },
})
