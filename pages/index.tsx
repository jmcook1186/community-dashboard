import * as React from 'react'
import { ChakraProvider, SimpleGrid, Heading } from '@chakra-ui/react'
import { GithubActiveMembersChart, DiscordActiveMembersChart, PeopleRaisingIssuesAndPrsChart, ActivityFrequencyByActivityTypeChart } from './charts'

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

  const githubPeopleRaisingIssuesAndPrsResponse = await fetch(process.env.peopleRaisingIssuesAndPrsUrl as string, { method: 'GET', headers, mode: 'cors' });
  const githubPeopleRaisingIssuesAndPrsData = await githubPeopleRaisingIssuesAndPrsResponse.text();

  const activityFrequencyByActivityTypeResponse = await fetch(process.env.activityFrequencyByActivityTypeUrl as string, { method: 'GET', headers, mode: 'cors' });
  const activityFrequencyByActivityTypeData = await activityFrequencyByActivityTypeResponse.text();

  return {
    props: { githubActiveMembersData: githubActiveMembersData, discordActiveMembersData: discordActiveMembersData, githubPeopleRaisingIssuesAndPrsData: githubPeopleRaisingIssuesAndPrsData, activityFrequencyByActivityTypeData: activityFrequencyByActivityTypeData }
  }
}




export default function App(props) {
  return (
    <div>
      <Heading as="h1" >Community dashboard</Heading>
      <br />
      <ChakraProvider>
        <h2>Github and Discord Activity</h2>
        <br />
        <SimpleGrid minChildWidth='120px' spacing='40px'>
          <GithubActiveMembersChart data={props.githubActiveMembersData} />
          <DiscordActiveMembersChart data={props.discordActiveMembersData} />
          <PeopleRaisingIssuesAndPrsChart data={props.githubPeopleRaisingIssuesAndPrsData} />
        </SimpleGrid>
        <br />
        <br />
        <SimpleGrid minChildWidth='120px' spacing='40px'>
          <ActivityFrequencyByActivityTypeChart data={props.activityFrequencyByActivityTypeData} />
        </SimpleGrid>
      </ChakraProvider>
    </div >
  )
}
