import React, {useState, useEffect } from 'react';
import {Grid} from '@material-ui/core';
import axios from 'axios';

import {gridSpacing} from '../../store/constant';
import EarningCard from '../../ui-component/cards/EarningCard';
import TotalChartCard from '../../ui-component/cards/TotalChartCard';
import TotalIncomePatternCard from '../../ui-component/cards/TotalIncomePatternCard';
import TotalIncomeCard from '../../ui-component/cards/TotalIncomeCard';
import ChartCard from '../../ui-component/cards/ChartCard';
import PopularCard from '../../ui-component/cards/PopularCard';
import IssuesCard from '../../ui-component/cards/IssuesCard';



//const number = getIssues();

const Dashboard = () => {

    const [issue_size, setIssueSize] = useState('');
    //console.log(issue_size);
    //console.log(getIssues());
    useEffect(() => {
        // Update the document title using the browser API
        // console.log(setIssueSize(issue_size));
        // value = getIssue();
        // setIssueSize(value);
        // console.log(issue_size);
        if(!issue_size){
            getIssues();
        }
    });

    const getIssues = async () => {

        axios.get('/api', {
            params: {
                size: false,
                data: true
            }
        })
          .then((response) =>{
              const data =  response.data;
              //this.setState({ posts: data });
              //console.log('data has been recived');
            //   const res = () => {
            //     <div className="getblogpost">
            //       <p>fda</p>
            //     </div>
            //   }
               // console.log(<p>{data.length}</p>);
                //console.log(data.length);
          
                setIssueSize(String(data.length));
                //console.log(data);
            //   return(res);
          })
          .catch(() =>{
              console.log('Error retrieving data!!!');
          });  

          
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <IssuesCard issues_s={issue_size}></IssuesCard>
                        {/* {issue_size}  */}
                    </Grid>
                    {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalChartCard />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomePatternCard />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeCard />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12} md={8}>
                        <ChartCard />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PopularCard />
                    </Grid>
                </Grid>
            </Grid> */}
        </Grid>
    );
};

export default Dashboard;
