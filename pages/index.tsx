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
  const GhActiveMembersUrl = process.env.GhActiveMembersUrl;
  const response = await fetch(GhActiveMembersUrl, { headers });
  const data = await response.text();

  return {
    props: { githubData: data }
  }
}


const GithubActivityChart = ({ githubData }) => {

  const data = JSON.parse(githubData)
  const cleanedData = (data.data.attributes.view_data.data[0].data)
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


export default function App({ githubData }) {
  return (
    <div>
      <h1>Community dashboard</h1>
      <br />
      <ChakraProvider>
        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
          <GithubActivityChart githubData={githubData} />
        </SimpleGrid>
      </ChakraProvider>
    </div>
  )
}
