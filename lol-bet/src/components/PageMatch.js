import React,{Component} from "react";
import {Divider} from "rsuite";
import ModalParis from "./ModalParis";

export default class PageMatch extends Component{
    constructor(props){
        super(props);
        this.state={
            teams:[],
            parties:[]
        }
        this.refModal=React.createRef();
    }

    componentDidMount(){
        fetch("http://localhost:3002/teams")
            .then(response => response.json())
            .then(data => this.setState({teams:data}))
            .catch(err => console.error(err));
        fetch("http://localhost:3002/parties")
            .then(response => response.json())
            .then(data => this.setState({parties:data}))
            .catch(err => console.error(err));
    }

    renderPartie = (partie,index)=>{
        let {teams}=this.state;
        let home=teams.find((team)=>team._id===partie.home_team);
        let away=teams.find((team)=>team._id===partie.away_team);
        return(
            <div style={{justifyContent: 'center',display: 'flex'}} key={index}>
                <div
                    onClick={()=>this.refModal.current.handleOpen(partie,home,away)}
                    style={{margin:20,padding:10,width:600,border:"solid",borderWidth:1,borderColor:"white",borderRadius:5,display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer"}}>
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
                    <Divider style={{color:"white"}}>Côte</Divider>
                    <div style={{justifyContent:"center",display:"flex",width:250}}>
                        <div style={{flex:2,color:"white"}}>
                            {partie.home_team_rating.toFixed(2)}
                        </div>
                        <div  style={{flex:2,color:"white"}}>
                            {partie.draft_rating.toFixed(2)}
                        </div>
                        <div  style={{flex:2,color:"white"}}>
                            {partie.away_team_rating.toFixed(2)}
                        </div>
                    </div>
                    <ModalParis/>
                </div>
            </div>
        )
    }

    render(){
        let {parties}=this.state;

        return(
            <div style={{margin: 50,minHeight:"80vh"}}>
                <Divider style={{color:"white"}}>Matchs</Divider>
                {parties.map(this.renderPartie)}
                <ModalParis ref={this.refModal}/>
                <Divider style={{color:"white"}}></Divider>
            </div>
        )
    }
}