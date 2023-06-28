import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { Url } from 'next/dist/shared/lib/router/router'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const GithubActiveMembersChart = ({ data }) => {

    const newData = JSON.parse(data)
    const cleanedData = (newData.data.attributes.view_data.data[0].data)
    let x: Array<string> = [];
    let y: Array<number> = [];
    for (var i: number = 0; i <= cleanedData.length - 1; i++) {
        const p = cleanedData[i]

        try {
            x.push(p['x']);
            y.push(p['y']);
        }
        catch {
            console.log("no data")
        }
    }
    const plotData = {
        labels: x,
        datasets: [
            {
                label: "Github Activity",
                data: y,
                fill: false,
                borderColor: "#742774"
            }
        ]
    };
    return (
        <div>
            <Line data={plotData} />
        </div>
    )
}


const DiscordActiveMembersChart = ({ data }) => {

    const newData = JSON.parse(data)
    const cleanedData = (newData.data.attributes.view_data.data[0].data)
    let x: Array<string> = [];
    let y: Array<number> = [];
    for (var i: number = 0; i <= cleanedData.length - 1; i++) {
        const p = cleanedData[i]

        try {
            x.push(p['x']);
            y.push(p['y']);
        }
        catch {
            console.log("no data")
        }
    }
    const plotData = {
        labels: x,
        datasets: [
            {
                label: "Discord Activity",
                data: y,
                fill: false,
                borderColor: "#742774"
            }
        ]
    };
    return (
        <div>
            <Line data={plotData} />
        </div>
    )
}

const PeopleRaisingIssuesAndPrsChart = ({ data }) => {

    const newData = JSON.parse(data)
    const cleanedData = (newData.data.attributes.view_data.data[0].data)
    let x: Array<string> = [];
    let y: Array<number> = [];
    for (var i: number = 0; i <= cleanedData.length - 1; i++) {
        const p = cleanedData[i]

        try {
            x.push(p['x']);
            y.push(p['y']);
        }
        catch {
            console.log("no data")
        }
    }
    const plotData = {
        labels: x,
        datasets: [
            {
                label: "Number of people raising issues and PRs",
                data: y,
                fill: false,
                borderColor: "#742774"
            }
        ]
    };
    return (
        <div>
            <Line data={plotData} />
        </div>
    )
}


const ActivityFrequencyByActivityTypeChart = ({ data }) => {

    const newData = JSON.parse(data)
    const cleanedData = (newData.data.attributes.view_data.data)
    let names: Array<string> = [];
    let raw_data: Array<object> = [];
    let dates: Array<string> = [];
    let frequency_data: Array<Array<number>> = [];

    for (var i: number = 0; i <= cleanedData.length - 1; i++) {
        const p = cleanedData[i]
        try {
            names.push(p['id']);
            raw_data.push(p['data']);
        }
        catch {
            console.log("no data")
        }
    }
    for (var i: number = 0; i <= raw_data.length - 1; i++) {
        let temp: Array<number> = []
        var element: Array<any> = raw_data[i]
        for (var j: number = 0; j <= element.length - 1; j++) {
            const subelement = element[j];
            try {
                temp.push(subelement['y'] as number)
                if (i === 0) {
                    dates.push(subelement['x'] as string)
                }
            }
            catch {
                console.log("no data")
            }
        }

        frequency_data.push(temp)
    }
    //frequency_data is now an array of arrays of frequency values. The index of each array maps to the index of names in names array.

    const colors = ["#BC8F8F", "0", "#fee391", "#DEB887", "#fec44f", "#fe9929", "#F5DEB3", "#ec7014", "#cc4c02", "#D2691E", "#993404", "#662506", "#ffffe5", "#800000", "#FFE4C4"];

    const datasets: Array<any> = [];
    for (var i: number = 0; i <= frequency_data.length - 1; i++) {
        const obj = { label: names[i], data: frequency_data[i], fill: false, borderColor: colors[i] }
        datasets.push(obj)
    }

    const plotData = {
        labels: dates,
        datasets: datasets
    };

    return (
        <div>
            <Line data={plotData} />
        </div>
    )
}



export { GithubActiveMembersChart, DiscordActiveMembersChart, PeopleRaisingIssuesAndPrsChart, ActivityFrequencyByActivityTypeChart }