import './App.css';
import {useState} from "react";
import "rsuite/dist/rsuite.min.css";
import {Nav, Navbar} from "rsuite";
import {SiRiotgames} from "react-icons/si";

import PageMatch from "./components/pages/PageMatch";
import PageParis from "./components/pages/PageParis";
import PageResultats from "./components/pages/PageResultats";
import {BiReset} from "react-icons/bi";

function App() {
  const [page,setPage] = useState("match");
  const renderPage = () => {
    switch(page){
      case "match":
        return <PageMatch/>;
      case "paris":
        return <PageParis/>;
      case "result":
        return <PageResultats/>
      default:
        return <PageMatch/>
    }
  }
  return (
    <div className="App">
      <Navbar>
        <Navbar.Brand style={{cursor:"pointer"}}>
          <SiRiotgames style={{marginRight:10}}/>
          LOL Bet
        </Navbar.Brand>
        <Nav>
          <Nav.Item onClick={()=>setPage("match")}>Matchs</Nav.Item>
          <Nav.Item onClick={()=>setPage("paris")}>Mes paris</Nav.Item>
          <Nav.Item onClick={()=>setPage("result")}>Résultats</Nav.Item>
        </Nav>
        <Nav pullRight>
          <Nav.Item onClick={()=>fetch("http://localhost:3002/reset").then(()=>window.location.reload())} icon={<BiReset size={25} style={{marginRight:10}}/>}>Reset DATABASE</Nav.Item>
        </Nav>
      </Navbar>
      {renderPage()}
    </div>
  );
}

export default App;
