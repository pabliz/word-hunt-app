import axios from "axios";
import { useState, useEffect } from "react";
import { Container, withStyles, Switch } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";
import grey from "@material-ui/core/colors/grey";

function App() {
  // STATES
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [LightMode, setLightMode] = useState(false);

  // DARK MODE SWITCH
  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: grey[500],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  // API GET REQUEST
  const dictionaryAPI = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );

      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //{console.log(meanings);}

  useEffect(() => {
    dictionaryAPI();
    // eslint-disable-next-line
  }, [word, category]);

  // RENDERING
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: LightMode ? "#fff" : "#282c34",
        color: LightMode ? "#000" : "#fff",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{LightMode ? "Dark" : "Light"} Mode</span>
          <DarkMode
            checked={LightMode}
            onChange={() => setLightMode(!LightMode)}
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          LightMode={LightMode}
        />
        {meanings && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            LightMode={LightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
