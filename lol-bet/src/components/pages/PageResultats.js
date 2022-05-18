import {Component} from "react";
import {Button} from "rsuite";

export default class PageResultats extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div>
                <Button>Résultats</Button>
            </div>
        )
    }
}