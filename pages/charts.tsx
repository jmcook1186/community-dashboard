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

export { GithubActiveMembersChart, DiscordActiveMembersChart }