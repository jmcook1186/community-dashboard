import * as React from 'react'
import { ChakraProvider, SimpleGrid } from '@chakra-ui/react'
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const APIKEY = process.env.APIKEY as string;
const AUTH = "Bearer " + APIKEY;
const headers = APIKEY ? ({
  'Content-Type': 'application/json',
  "Authorization": AUTH
}) : undefined
export const getStaticProps = async () => {
  const ghActiveMembersUrl: string = process.env.ghActiveMembersUrl as string;
  const ghActiveMembersResponse = await fetch(ghActiveMembersUrl, { method: 'GET', headers, mode: 'cors' });
  const githubActiveMembersData = await ghActiveMembersResponse.text();


  const discordActiverMembersUrl: string = process.env.discordActiverMembersUrl as string;
  const discordActiverMembersResponse = await fetch(discordActiverMembersUrl, { method: 'GET', headers, mode: 'cors' });
  const discordActiverMembersData = await discordActiverMembersResponse.text();



  return {
    props: { githubActiveMembersData: githubActiveMembersData, discordActiverMembersData: discordActiverMembersData }
  }
}


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



export default function App(props) {
  return (
    <div>
      <h1>Community dashboard</h1>
      <br />
      <ChakraProvider>
        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
          <GithubActiveMembersChart data={props.githubActiveMembersData} />
          <DiscordActiveMembersChart data={props.githubActiveMembersData} />
        </SimpleGrid>
      </ChakraProvider>
    </div>
  )
}
