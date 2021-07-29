import React, { Component } from 'react';
import axios from 'axios';

import {Grid} from '@material-ui/core';

import {gridSpacing} from '../../store/constant';
import EarningCard from '../../ui-component/cards/EarningCard';
import TotalChartCard from '../../ui-component/cards/TotalChartCard';
import TotalIncomePatternCard from '../../ui-component/cards/TotalIncomePatternCard';
import TotalIncomeCard from '../../ui-component/cards/TotalIncomeCard';
import ChartCard from '../../ui-component/cards/ChartCard';
import PopularCard from '../../ui-component/cards/PopularCard';

class Issues extends Component{

    state = {
        name: '',
        priority: '',
        severity: '',
        status: '',
        issues: []
    };

    componentDidMount = () => {
        this.getIssues();
    };

    handleChange = ({ target }) =>{
        const { name, value } = target;
    
        this.setState({
          [name]: value
        })
    };

    getIssues = () => {
        axios.get('/api', {
            params: {
                size: false,
                data: true
            }
        })
          .then((response) =>{
              const data = response.data;
              //this.setState({ posts: data });
              //console.log('data has been recived');
            //   const res = () => {
            //     <div className="getblogpost">
            //       <p>fda</p>
            //     </div>
            //   }
                console.log(response);
                this.setState({ issues: data });
                //console.log(data);
            //   return(res);
          })
          .catch(() =>{
              console.log('Error retrieving data!!!');
          });
    };

    remove = (issue) => {
    
        const payload = {
          id: issue._id,
        };
        console.log("Name " , payload.name)
        axios({
            url: 'api/remove',
            method: 'POST',
            data: payload
          })
            .then(() =>{
                console.log('Data has deleted');
            })
            .catch(() =>{
                console.log("Error removing issue");
            });
        window.location.reload(false);
    }

    submit = (event) => {
        event.preventDefault();
    
        const payload = {
          name: this.state.name,
          priority: this.state.priority,
          severity: this.state.severity,
          status: this.state.status,
        };
    
        axios({
          url: 'api/save',
          method: 'POST',
          data: payload
        })
          .then(() => {
            console.log('Data has been sent to the server');
            //this.resetUserInputs();
          })
          .catch(() => {
            console.log('Internal server error');
          });
      }

    displayIssues = (issues) =>{
        if (!issues.length) return null;
       // console.log("issues: " + issues);
        const data = issues.map((issue, index) => (
            <tr>
                <th>{issue.name}</th>
                <th>Description</th>
                <th>{issue.severity}</th>
                <th>{issue.priority}</th>
                <th>{issue.status}</th>
                <th>{issue._id}</th>
                <th><button onClick={() => this.remove(issue)}>Remove</button></th>
            </tr>
        ));

        console.log(data);
        return data;
    };

    render(){
        return(
            <div class="section-main-content">
                
               <div class="container-2 w-container">
                   <div class="issues">
                        <div class="table-wrapper">
                            <div class="issues-header">
                                <h1>Issues</h1>
                            </div>
                            <table class="fl-table">
                                <thead>                                   
                                    <tr>
                                        <th>Summary</th>
                                        <th>Description</th>
                                        <th>Severity</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>ID</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.displayIssues(this.state.issues)}
                                </tbody>
                            </table>
                        </div>
                    </div>
               </div>
            </div>
        );
    }
}

export default Issues;