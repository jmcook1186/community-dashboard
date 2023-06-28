import * as React from 'react'
import { ChakraProvider, SimpleGrid } from '@chakra-ui/react'
import { GithubActiveMembersChart, DiscordActiveMembersChart } from './charts'

const APIKEY = process.env.APIKEY as string;
const AUTH = "Bearer " + APIKEY;
const headers = APIKEY ? ({
  'Content-Type': 'application/json',
  "Authorization": AUTH
}) : undefined

export const getStaticProps = async () => {

  const ghActiveMembersResponse = await fetch(process.env.ghActiveMembersUrl as string, { method: 'GET', headers, mode: 'cors' });
  const githubActiveMembersData = await ghActiveMembersResponse.text();

  const discordActiveMembersResponse = await fetch(process.env.discordActiveMembersUrl as string, { method: 'GET', headers, mode: 'cors' });
  const discordActiveMembersData = await discordActiveMembersResponse.text();


  return {
    props: { githubActiveMembersData: githubActiveMembersData, discordActiveMembersData: discordActiveMembersData }
  }
}




export default function App(props) {
  return (
    <div>
      <h1>Community dashboard</h1>
      <br />
      <ChakraProvider>
        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
          <GithubActiveMembersChart data={props.githubActiveMembersData} />
          <DiscordActiveMembersChart data={props.discordActiveMembersData} />
        </SimpleGrid>
      </ChakraProvider>
    </div>
  )
}
