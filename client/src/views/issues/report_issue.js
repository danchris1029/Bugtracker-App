import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import PropTypes from "prop-types";

const delay = ms => new Promise(res => setTimeout(res, ms));

class report_issue extends Component{

  constructor(props){
    super();
    this.state = {
      name: 'fd',
      priority: '',
      severity: '',
      status: '',
      issues: [],
      sent: false,
      canSend: true
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount(){
    //this.setSent();
    
  }

  handleChange = ({ target }) =>{
      const { name, value } = target;
  
      this.setState({
        [name]: value
      })
  };

  submit = async (event) => {
      event.preventDefault();
  
      const payload = {
        name: this.state.name,
        priority: this.state.priority,
        severity: this.state.severity,
        status: this.state.status,
      };
  
      if(this.state.canSend){
        this.setState({canSend: false});
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
          this.setState({sent: true});

          await delay(700);

          this.props.history.push("/");
      }
    }
    
    showSent = () =>{
      console.log(this.state.sent);
      // var data;
      // if(this.state.sent){
      //   data = () => {
      //       <div><p>sent</p></div>
      //   };
      // }
      const data = () =>(
        <div><p>sent</p></div>
      );
      //this.setState({sent: true})
      console.log(data);
      var boo = ""
      if(this.state.sent)
        { return(<div class="sent-issue"><p>Issue has been submitted</p></div>)}
      else
        return;
      //return data;
    };
    setSent = () =>{
      this.setState({sent: true})
    }
    
  render(){
    console.log("state is "+this.state.sent);
    //let {sent} = this.state;
      return ( 
          <body>
                <div class="form-full">
                <form class="form-issues" onSubmit={this.submit}>
                  <div className="form-input">
                  <text>Name         </text>
                    <input 
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-input">
                    <text>Priority         </text>
                    <textarea 
                      placeholder="priority" 
                      name="priority" 
                      cols="50" 
                      rows="1"
                      value={this.state.priority}
                      onChange={this.handleChange}
                    >
                    </textarea>
                  </div>
                  <div className="form-input">
                    <text>Severity         </text>
                    <textarea 
                      placeholder="severity" 
                      name="severity" 
                      cols="50" 
                      rows="1"
                      value={this.state.severity}
                      onChange={this.handleChange}
                    >
                    </textarea>
                  </div>
                  <div className="form-input">
                    <text>Status         </text>
                    <textarea 
                      placeholder="status" 
                      name="status" 
                      cols="50" 
                      rows="1"
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
                    </textarea>
                  </div>
                  <div class="center">
                    <button class="center">Submit</button>
                  </div>
                </form>
                </div>

              <div>
                {/* <p>Vlaue is </p> */}
                {this.showSent()}
                
              </div>
              {/* <Footer></Footer> */}
          </body>
      );
  }
}

export default report_issue;