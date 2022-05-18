import './App.css';
import {useState} from "react";
import "rsuite/dist/rsuite.min.css";
import {Nav, Navbar} from "rsuite";
import {SiRiotgames} from "react-icons/si";

import PageMatch from "./components/PageMatch";
import PageParis from "./components/PageParis";
import PageResultats from "./components/PageResultats";

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
      </Navbar>
      {renderPage()}
    </div>
  );
}

export default App;
