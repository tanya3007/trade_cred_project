import React from 'react';
import './Upload.css'
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import {ExcelRenderer} from 'react-excel-renderer';


export class Upload extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null,
            rows: null,
            btn: false
        }
    }

// this func is for saving the Excel file data into the state.
    onFileChange = event => { 
     
        this.setState({ selectedFile: event.target.files[0] });

        ExcelRenderer(event.target.files[0], (err, resp) => {
            if(err){
                console.log(err);   
            }
            else{
                this.setState({ rows: resp.rows });
            }
          });
       
    };

// this func is to display the details of the file selected
    fileData = () => { 
    
        if (this.state.selectedFile) {  
          return ( 
            <div>
                <br></br>
                <h2>File Details:</h2> 
                <p>File Name: {this.state.selectedFile.name}</p> 
                <p>File Type: {this.state.selectedFile.type}</p> 
                <p> 
                Last Modified:{" "} 
                {this.state.selectedFile.lastModifiedDate.toDateString()} 
                </p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
                <br></br>
                <h4 style={{padding:'1%'}}>Choose before Pressing the Upload button</h4> 
            </div> 
          ); 
        } 
      }; 

// as soon as the user clicks the Upload button, the file type is validated
// whether it is an excel file or not. If yes, then it is sent to the server
// using fetch Post API.
    uploadFile = e =>{

        const validType = ['.xlsx', '.xls'];

        let fileType = this.state.selectedFile.name.slice( this.state.selectedFile.name.lastIndexOf('.'), )

        if ( validType.indexOf(fileType) < 0 ){
            alert('Invalid File Format. Use only .xls or .xlsx')
        }
        else {

// fetch Post API
            fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rows: this.state.rows })
            })
            .then(response => response.json() )
            .then(data => {
                this.props.handleClose();
                this.props.handleData(data);
                this.setState({ btn: true });
            })
            .catch(error => {
                console.log(error);
                alert("There was some error Uploading. Kindly Upload Again.");
            } )
        }
    }    

render(){

// this variable is used for displaying the Button as soon as request recieved 
// from the backend.
    let p;
    if(this.state.btn){
        p = (<Button onClick={()=>{ this.props.handleClose() }} variant='contained' color="Default" >
                Info
            </Button>)
    }
    else{
        p = ' '
    }

    return (
      <div className='upload-main' >
        <h1>Select an excel file to process.</h1>
        <div>
            <input
                accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                className='upload-input'
                id="contained-button-file"
                type="file"
                onChange={this.onFileChange}
            />
            <label htmlFor="contained-button-file" className='upload-icon-label'>
                <Button variant="contained" color="primary" component="span" startIcon={<PublishIcon />}>
                    Choose
                </Button>
            </label>
            <Button onClick={this.uploadFile} variant="outlined" color="secondary">
                Upload
            </Button>
        </div>

        {this.fileData()}

        <br></br>
        <br></br>

        {p}

      </div>
    );
  }
}

export default Upload