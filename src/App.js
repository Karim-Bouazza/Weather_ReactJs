import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import CardWeather from './Components/CardWeather';
import Container from '@mui/material/Container';

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="centerInContainer" style={{height: "100vh"}}>
          <Container maxWidth="sm" className="container">
            <CardWeather/>
          </Container>
        </div>
    </ThemeProvider>
  );
}
