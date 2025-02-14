import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CountryDetailsScreen, HomeScreen } from "@/screens/index";
import HomeHeader from "@/components/HomeHeader";
import DetailsHeader from "@/components/DetailsHeader";
import { SearchProvider } from "@/context/SearchContext";
import { FilterProvider } from "@/context/FilterContext";

export const Stack = createStackNavigator();

const RootNavigator = () => {

    return (
        <SearchProvider>
            <FilterProvider>

                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                            headerTitleStyle: {
                            fontFamily: 'Axiforma',
                }, }}>
                        <Stack.Screen name="Home" component={HomeScreen} options={{
                            headerShown: true, header: () => <HomeHeader />
                        }} />
                        <Stack.Screen name="Details" component={CountryDetailsScreen} options={({ route, navigation }) => ({
                            // title: route?.params.countryName,
                            header: () => <DetailsHeader navigation={navigation} title={route?.params.countryName} />
                            // headerShown: false
                        })} />
                    </Stack.Navigator>
                </NavigationContainer>
            </FilterProvider>
        </SearchProvider>
    )

}

export default RootNavigator
