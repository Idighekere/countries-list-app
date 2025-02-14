export interface ICountryDetails {
    flags: Flags;
    name: Name;
    currencies: Record<string, Currencies>;
    idd: Idd;
    capital: string[];
    region: string;
    languages: Record<string, string>;
    area: number;
    maps?: Maps;
    population: number;
    car: Car;
    timezones: string[];

    continents: string[]
}

export interface Car {
    signs: string[];
    side: string;
}

export interface Currencies {
    name: string;
    symbol: string;
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Idd {
    root: string;
    suffixes: string[];
}



export interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

export interface Name {
    common: string;
    official: string;
    nativeName?: Record<string, NativeName>;
}


export interface ICountry {
    flags: Flags;
    name: Name;
    capital: string[];
    region: string;
    timezones: string[];
    continents: string[]
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Name {
    common: string;
    official: string;
    nativeName?: Record<string, NativeName>;
}



export interface NativeName {
    official: string;
    common: string;
}
