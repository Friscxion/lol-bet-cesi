import React, {Component} from "react";
import {Button, Modal} from "rsuite";



export default class ModalParis extends Component{
    constructor(props) {
        super(props);
        this.state={
            open:false,
            partie:null,
            home:null,
            away:null
        }
    }

    handleOpen = (partie,home,away) => {
        this.setState({open:true,partie:partie,home:home,away:away})
    }
    handleClose = () => {
        this.setState({open:false})
    }

    render() {
        const {handleClose}=this;
        const {open,partie,home,away}=this.state;
        return(
            <div className="modal-container">
                <Modal open={open} onClose={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Modal Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {partie?
                            <>
                                <div style={{justifyContent:"center",display:"flex",width:250}}>
                                <span className={"equipe"}>
                                    {home.name}
                                </span>
                                            <span className={"equipe vs"}>
                                    VS
                                </span>
                                            <span className={"equipe"}>
                                    {away.name}
                                </span>
                                </div>
                            </>
                            :null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose} appearance="primary">
                            Ok
                        </Button>
                        <Button onClick={handleClose} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}