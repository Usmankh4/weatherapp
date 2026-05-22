export function transformForecastList(list){

    const allDates = list.map(entry => entry.dt_txt.split(" ")[0]);

    const uniqueDates = [];

    for(const date of allDates){
        if(!uniqueDates.includes(date)){
            uniqueDates.push(date);
        }
    }
    const firstFiveDates = uniqueDates.slice(0,5);

    const forecastData = firstFiveDates.map(date => {
        const dayEntries = list.filter(entry => entry.dt_txt.split(" ")[0] === date);


        const temps = dayEntries.map(entry => entry.main.temp);

        const high = Math.max(...temps);
        const low = Math.min(...temps);
        const middleEntry = dayEntries[Math.floor(dayEntries.length / 2)];

        return {
            date,
            high,
            low,
            icon: middleEntry.weather[0].icon,
            description: middleEntry.weather[0].description
        }
    });

    return forecastData;
}