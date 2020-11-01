import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export class Dialog1 extends Component {
    render() {

// this variable is to conditionally display the data inside the dialog box.
        let q;
        if(this.props.data){
            q = (
                <div>
                    <p>Numer of Invoices Uploaded : <strong>{this.props.data.numInvoices}</strong></p>
                    <p>The Total Sum of Invoice Amounts : <strong>{this.props.data.totSum}</strong></p>
                    <p>Total Number of Vendors whose invoices were uploaded : <strong>{this.props.data.numVendor}</strong></p>
                    <p>Total Number of Invalid Invoices : <strong>{this.props.data.invalidInvoices}</strong></p>        
                </div>
                )
        }
        else{
            q = ' '
        }

        return (
            <div>
                
                <Dialog onClose={this.props.handleClose} aria-labelledby="customized-dialog-title" open={this.props.close}>
                    <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
                        Sheet Info
                    </DialogTitle>
                    <DialogContent dividers>

                        {q}

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.props.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default Dialog1
