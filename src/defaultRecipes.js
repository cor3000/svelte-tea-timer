import { palette } from "./dynStyles.js"

export const recipes = [
    {
        id: "000",
        name: "High Mountain Tea",
        label: "高山茶",
        color: palette[0],
        brewTimes: [80, 40, 50, 60, 80]
    },
    {
        id: "001",
        name: "Jin Xuan Tea",
        label: "金萱茶",
        color: palette[1],
        brewTimes: [75, 35, 55, 70]
    },
    {
        id: "002",
        name: "Bao Zhong Tea",
        label: "包種茶",
        color: palette[2],
        brewTimes: [30, 20, 25, 30, 40]
    },
    {
        id: "003",
        name: "Oolong Tea",
        label: "烏龍茶",
        color: palette[3],
        brewTimes: [50, 35, 40, 50]
    },
    {
        id: "004",
        name: "Oriental Beauty",
        label: "東方美人茶",
        color: palette[4],
        brewTimes: [40, 45, 50, 70]
    },
    {
        id: "005",
        name: "Black Tea",
        label: "紅茶",
        color: palette[5],
        brewTimes: [30, 35, 40, 60]
    },
    {
        id: "006",
        name: "Pu'er Tea",
        label: "普洱茶",
        color: palette[6],
        brewTimes: [80, 10, 15, 15, 20, 30, 40, 60]
    }
];
