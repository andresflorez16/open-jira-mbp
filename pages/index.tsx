import type { NextPage } from 'next'
import { 
  Grid,
  Card,
  CardHeader,
  Typography,
} from '@mui/material'
import { Layout } from '../components/layouts/Layout'
import { EntriesList } from '../components/entries-list'
import { NewEntry } from '../components/new-entry'

const Home: NextPage = () => {

  return (
    <Layout title='OpenJira - Home'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: 'calc(100vh - 100px)',
            }}
          >
            <CardHeader title={<Typography variant='h4' color='primary'>Pending</Typography>}/>
            <NewEntry />
            <EntriesList status='pending'/>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title={<Typography variant='h4'>In progress</Typography>}/>
            <EntriesList status='in-progress'/>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title={<Typography variant='h4'>Finished</Typography>}/>
            <EntriesList status='finished'/>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Home
