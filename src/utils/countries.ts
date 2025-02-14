export const groupByFirstLetter = (countries: any) => {


    return countries.reduce((acc: { title: string; data: any[] }[], country) => {

        const firstLetter = country.name.common[0].toUpperCase()

        //Find an existing section or create new one
        let section = acc.find((s) => s.title == firstLetter)

        if (!section) {
            section = { title: firstLetter, data: [] };
            acc.push(section)

        }
        section.data.push(country)
        return acc
    }, [])

}
