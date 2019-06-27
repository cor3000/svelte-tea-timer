import { palette } from "./dynStyles.js"

export const recipes = [
    {
        id: "000",
        name: "gaoshan",
        label: "高山茶",
        color: palette[0],
        brewTimes: [80, 40, 50, 60, 80]
    },
    {
        id: "001",
        name: "jinxuan",
        label: "金萱茶",
        color: palette[1],
        brewTimes: [75, 35, 55, 70]
    },
    {
        id: "002",
        name: "baozhong",
        label: "包種茶",
        color: palette[3],
        brewTimes: [30, 20, 25, 30, 40]
    },
    {
        id: "003",
        name: "oolong",
        label: "烏龍茶",
        color: palette[6],
        brewTimes: [50, 35, 40, 50]
    },
    {
        id: "004",
        name: "orientalbeauty",
        label: "東方美人茶",
        color: palette[8],
        brewTimes: [40, 45, 50, 70]
    },
    {
        id: "005",
        name: "blacktea",
        label: "紅茶",
        color: palette[10],
        brewTimes: [30, 35, 40, 60]
    },
    {
        id: "006",
        name: "puer",
        label: "普洱茶",
        color: palette[11],
        brewTimes: [80, 10, 15, 15, 20, 30, 40, 60]
    }
];
