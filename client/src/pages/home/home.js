import React,{useEffect,useState}from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../../components/screams/screams';
import Profile from '../../components/Profile/Profile';
import {connect} from 'react-redux';
import {getScreams,getScream} from '../../redux/actions/dataActions';


function Home(props) {
    const {screams,loading}=props.data
     
  useEffect(()=>{
       props.getScreams();
  },[])

  

  const listofscreams= !loading ? screams.map(scream=><div><Scream key={scream.scream_id}  scream={scream} /></div>):(<p>Loading...</p>)

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

const mapStateToProps=(state)=>({
  data: state.data,
})

const mapDispatchToProps=(dispatch)=>{
  return {
    getScreams:()=>{
     dispatch(getScreams())
  },
 
}
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);
