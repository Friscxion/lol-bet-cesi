import React, {Component} from "react";
import {Button, Divider, Input, InputGroup, Modal} from "rsuite";
import {CHOIX} from "../../utils/choix";


export default class ModalParis extends Component{
    constructor(props) {
        super(props);
        this.state={
            open:false,
            partie:null,
            home:null,
            away:null,
            selected:null,
            mise:""
        }
    }

    handleOpen = (partie,home,away) => this.setState({open:true,partie:partie,home:home,away:away})

    handleClose = () => this.setState({open:false,selected:null,mise:""})

    handleSelected = (choix) => this.setState({selected:choix});

    colorize = (choix) => choix===this.state.selected?{color:"green"}:{};

    handleSubmit =  () => {
        fetch("http://localhost:3002/tickets",{
            method:"PUT",
            body:JSON.stringify({
                party_id:this.state.partie._id,
                pronostic:this.state.selected,
                bet:this.state.mise
            }),
            headers:{
                "Content-Type": "application/json"
            }
        }).then(this.handleClose)
            .catch(err => console.error(err));
    }

    render() {
        const {handleClose,handleSelected,handleSubmit,colorize}=this;
        const {open,partie,home,away,mise,selected}=this.state;
        return(
            <div className="modal-container">
                <Modal open={open} onClose={handleClose}>
                    <Modal.Header>
                        <Modal.Title>
                            Créer un pari
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {partie?
                            <>
                                <div style={{justifyContent:"center",display:"flex",width:"100%",marginTop:20,fontSize:20}}>
                                    <div className={"color-blue"} style={{flex:2,textAlign:"center",fontWeight:"bold"}}>
                                        {home.name}
                                    </div>
                                    <div  className={"vs"} style={{flex:2,textAlign:"center",fontWeight:"bold"}}>
                                        {"VS"}
                                    </div>
                                    <div className={"color-blue"} style={{flex:2,textAlign:"center",fontWeight:"bold"}}>
                                        {away.name}
                                    </div>
                                </div>
                                <Divider>Cote</Divider>
                                <div style={{justifyContent:"center",display:"flex",width:"100%"}}>
                                    <div className={"color-blue"} style={{flex:2,textAlign:"center",fontWeight:"bold"}}>
                                        {partie.home_team_rating.toFixed(2)}
                                    </div>
                                    <div className={"color-blue"} style={{flex:2,textAlign:"center",fontWeight:"bold"}}>
                                        {partie.draft_rating.toFixed(2)}
                                    </div>
                                    <div className={"color-blue"} style={{flex:2,textAlign:"center",fontWeight:"bold"}}>
                                        {partie.away_team_rating.toFixed(2)}
                                    </div>
                                </div>
                                <div style={{justifyContent:"center",display:"flex",width:"100%"}}>
                                    <Button className={"border"} active={selected===CHOIX.HOMEWIN} appearance="subtle" {...colorize(CHOIX.HOMEWIN)} style={{flex:2,margin:5}} onClick={handleSelected.bind(this,CHOIX.HOMEWIN)}>{home.name+" WIN"}</Button>
                                    <Button className={"border"} active={selected===CHOIX.DRAW} appearance="subtle" {...colorize(CHOIX.DRAW)} style={{flex:2,margin:5}} onClick={handleSelected.bind(this,CHOIX.DRAW)}>{"DRAW"}</Button>
                                    <Button className={"border"} active={selected===CHOIX.AWAYWIN} appearance="subtle" {...colorize(CHOIX.AWAYWIN)}style={{flex:2,margin:5}} onClick={handleSelected.bind(this,CHOIX.AWAYWIN)}>{away.name+" WIN"}</Button>
                                </div>
                                <div style={{display:"flex",width:"100%"}}>
                                    <div style={{width:"100%",display:"flex",flexDirection:"row",marginTop:20}}>
                                        <div style={{flex:2,justifyContent:"end",paddingRight:10,textAlign:"end",alignItems:"center",height:"100%",display:"flex"}}>
                                            <span>Mise : </span>
                                        </div>

                                        <InputGroup style={{flex:4,marginRight:100}}>
                                            <Input type={"number"} value={mise} onChange={(data)=>this.setState({mise:data})}/>
                                            <InputGroup.Addon>€</InputGroup.Addon>
                                        </InputGroup>
                                    </div>
                                </div>
                            </>
                            :null}
                    </Modal.Body>
                    <Modal.Footer style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        <Button disabled={!(selected&&mise)} onClick={handleSubmit} appearance="primary" color={"green"}>
                            Valider
                        </Button>
                        <Button onClick={handleClose} appearance="subtle">
                            Annuler
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}