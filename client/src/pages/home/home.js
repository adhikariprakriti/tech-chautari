import React,{useEffect,useState}from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../../components/screams/screams';
import Profile from '../../components/Profile/Profile';


function Home() {
    const [screams,setscreams]=useState(null)
    useEffect(()=>{
       axios.get('http://localhost:5000/screams')
       .then(response=>{
         setscreams(response.data)
       })
      })

   const listofscreams= screams ? screams.map(scream=><Scream key={scream.scream_id} scream={scream}/>):(<p>Loading...</p>)

   return (
    <Grid container spacing={2} >
      <Grid item sm={8} xs={12}>
        {listofscreams}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}

export default Home;
