
import React from 'react';
import Upload from './components/Upload'
import Dialog1 from './components/Dialog1'

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dialogOpen: false,
      data: null
    }
  }
  handleClose = () =>{
    this.setState({dialogOpen: !this.state.dialogOpen})
}

  handleData = e =>{
    this.setState({ data: e })
  }

render(){
  return (
    <div className="App">
      <Upload handleClose= {this.handleClose} handleData= {this.handleData} />
      <Dialog1 handleClose= {this.handleClose} close= {this.state.dialogOpen} data= {this.state.data} />
    </div>
  );
}
}

// export default App;
