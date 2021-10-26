import React, {Component} from 'react';
import Layout from '../components/layout'
import LibTest from '../libs/LibTest'
//
export default class Test extends Component {
  constructor(props){
    super(props)
  }
  async componentDidMount(){
    await LibTest.getTest();
  }   
  render() {
    return (
      <Layout>
        <div className="container">
          <hr className="mt-2 mb-2" />
          <h1>test</h1>
        </div>
      </Layout>
    )    
  } 
}
