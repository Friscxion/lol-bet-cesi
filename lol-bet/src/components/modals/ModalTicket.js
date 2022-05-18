import React, {Component} from "react";
import {Button, Modal} from "rsuite";
import {CHOIX} from "../../utils/choix";



export default class ModalTicket extends Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
            ticket:null
        }
    }
    handleOpen = (ticket) => this.setState({open:true,ticket:ticket})

    handleClose = () => this.setState({open:false});

    colorize = (choix,prono)=> choix===prono?{color:"white",backgroundColor:"#37ab3c"}:null

    renderBets = (bet,index) => {
        let {teams,parties}=this.props;
        let partie=parties.find((party)=>party._id===bet.party_id);
        let home=teams.find((team)=>team._id===partie.home_team);
        let away=teams.find((team)=>team._id===partie.away_team);
        let ratio;
        if(bet.pronostic===CHOIX.HOMEWIN)ratio=partie.home_team_rating;
        else if(bet.pronostic===CHOIX.AWAYWIN)ratio=partie.away_team_rating;
        else ratio=partie.draft_rating;
        let mise=parseFloat(bet.potential_gain)/parseFloat(ratio);
        return(
            <div style={{display:"flex"}} key={index}>
                <span className={"border"} style={{flex:2,textAlign:"center",...this.colorize(CHOIX.HOMEWIN,bet.pronostic)}}>{home.name}</span>
                <span className={"border"} style={{flex:2,textAlign:"center",...this.colorize(CHOIX.DRAW,bet.pronostic)}}></span>
                <span className={"border"} style={{flex:2,textAlign:"center",...this.colorize(CHOIX.AWAYWIN,bet.pronostic)}}>{away.name}</span>
                <span className={"border"} style={{flex:2,textAlign:"center"}}>{mise.toFixed(0)}</span>
                <span className={"border"} style={{flex:2,textAlign:"center"}}>{bet.potential_gain}</span>
            </div>
        );
    }

    render() {
        const {handleClose}=this;
        const {ticket,open}=this.state;

        return(
            <div className="modal-container">
                <Modal open={open} onClose={handleClose}>
                    <Modal.Header>
                        <Modal.Title>
                           { "Ticket : "+ticket?._id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{display:"flex",fontWeight:"bold"}}>
                            <span className={"border"} style={{flex:2,textAlign:"start"}}>Home</span>
                            <span className={"border"} style={{flex:2,textAlign:"start"}}>Draw</span>
                            <span className={"border"} style={{flex:2,textAlign:"start"}}>Away</span>
                            <span className={"border"} style={{flex:2,textAlign:"start"}}>Bet</span>
                            <span className={"border"} style={{flex:2,textAlign:"start"}}>Potential Gain</span>
                        </div>
                        {ticket?.bets.map(this.renderBets)}
                    </Modal.Body>
                    <Modal.Footer >
                        <Button onClick={handleClose} appearance="subtle">
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}