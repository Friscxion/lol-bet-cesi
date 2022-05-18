import React, {Component} from "react";
import {Button, Divider} from "rsuite";
import ModalTicket from "../modals/ModalTicket";


export default class PageParis extends Component{
    constructor(props){
        super(props);
        this.state={
            tickets:[],
            parties:[],
            teams:[]
        }
        this.refModal=React.createRef();
    }

    componentDidMount(){
        fetch("http://localhost:3002/tickets")
            .then(response=>response.json())
            .then(data=>this.setState({tickets:data}))
            .catch(e=>console.error(e));
        fetch("http://localhost:3002/teams")
            .then(response => response.json())
            .then(data => this.setState({teams:data}))
            .catch(err => console.error(err));
        fetch("http://localhost:3002/parties")
            .then(response => response.json())
            .then(data => this.setState({parties:data}))
            .catch(err => console.error(err));
    }


    renderParis = (ticket,index) => {
        let date = new Date(parseInt(ticket.date));
        return(
            <div style={{justifyContent: 'center',display: 'flex'}} key={index}>
                <div onClick={()=>this.refModal.current.handleOpen(ticket)}
                    style={{margin:20,padding:10,width:600,border:"solid",borderWidth:1,borderColor:"white",borderRadius:5,display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer"}}>
                    <span style={{color:"white"}}>{date.toLocaleString()}</span>
                    <span style={{color:"#c9c9c9"}}>{ticket._id}</span>
                    <span style={{color:"white"}}>Nombre de paris: {ticket.bets.length}</span>
                    <div className={"color-blue"} style={{display:"flex",flex:1,width:"100%",borderRadius:20}}>
                        <span className={"border"} style={{flex:3,textAlign:"center",borderRadius:20,backgroundColor:"#d0d0d0"}}>Mise total: {ticket.bet+"€"}</span>
                        <span className={"border"} style={{flex:3,textAlign:"center",borderRadius:20,backgroundColor:"#d0d0d0"}}>Gain Potentiel: {ticket.potential_gain+"€"}</span>
                    </div>

                </div>
            </div>
        )
    }


    render(){
        let {tickets,teams,parties}=this.state;
        return(
            <div style={{margin: 50,minHeight:"80vh"}}>
                <Divider style={{color:"white"}}>Tickets</Divider>
                {tickets.map(this.renderParis)}
                <Divider style={{color:"white"}}></Divider>
                <ModalTicket ref={this.refModal} teams={teams} parties={parties}/>
            </div>
        )
    }
}