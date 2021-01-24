import numeral from "numeral";

export const TransformData = (data) => {
    return `${numeral(data).format("0.0a")}     `;
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function AddPlus(x) {
    if(parseFloat(x) >= 0)
        return `+${x}`;

    return x;
}

export function Sort(countries, sortType="cases") {
    return countries.sort((a, b) => (a[sortType] < b[sortType]) ? 1 : -1);
}
