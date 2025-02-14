export interface ICountryDetails {
    name:              string;
    full_name:         string;
    capital:           string;
    iso2:              string;
    iso3:              string;
    covid19:           Covid19;
    current_president: CurrentPresident;
    currency:          string;
    phone_code:        string;
    continent:         string;
    description?:       null;
    size:              string;
    independence_date: null;
    population:        string;
    href:              TopLevelHref;
}

export interface Covid19 {
    total_case:   string;
    total_deaths: string;
    last_updated: Date;
}

export interface CurrentPresident {
    name:                   string;
    gender?:                 string;
    appointment_start_date?: Date;
    appointment_end_date?:   null;
    href?:                   CurrentPresidentHref;
}

export interface CurrentPresidentHref {
    self:    string;
    country: string;
    picture: string;
}

export interface TopLevelHref {
    self?:       string;
    states:     string;
    presidents: string;
    flag:       string;
}
