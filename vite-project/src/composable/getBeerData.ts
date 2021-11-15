import axios from 'axios';

const allBeerDataArray = (obj: any, array: any) => {
    obj.data.forEach((el: any) => array.push(el))
}

export const getBeerData = async () => {
    const beers: any[] = [];

    const data1 =  await axios.get("https://api.punkapi.com/v2/beers?page=1&per_page=80");
    // const data2 =  await axios.get("https://api.punkapi.com/v2/beers?page=2&per_page=80");
    // const data3 =  await axios.get("https://api.punkapi.com/v2/beers?page=3&per_page=80");
    
    allBeerDataArray(data1, beers);
    // allBeerDataArray(data2, beers);
    // allBeerDataArray(data3, beers);

    return beers;
}
