import "./CardWeather.css";
import CloudIcon from '@mui/icons-material/Cloud';
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import "moment/min/locales"
import { useTranslation } from 'react-i18next';
moment.locale("en");

let cencelAxios = null;

export default function CardWeather () {
    const { t, i18n } = useTranslation();
    const [langauge, setLangauge] = useState("en")
    const [time, setTime] = useState("");
    const [temp, setTemp] = useState({
        number: null,
        description: "",
        min: null,
        max: null,
        icon: null
    });
    useEffect(() => {
        i18n.changeLanguage("en");
        setTime(moment().format("MMM Do YY"));
        axios.get("https://api.openweathermap.org/data/2.5/weather?lat=36.75&lon=3.05&appid=3ff9427b41b4f5889e50ac0bee461fbf", {
           cencelToken: new axios.CancelToken((c) => {
            cencelAxios = c;
           })
        })
        .then((response) => {
            const responseNumber = Math.round(response.data.main.temp - 272.15);
            const responseDescription = response.data.weather[0].description;
            const responseIcon = response.data.weather[0].icon;
            const responseMin = Math.round(response.data.main.temp_min - 272.15);
            const responseMax = Math.round(response.data.main.temp_max - 272.15);
            setTemp({
                number: responseNumber,
                description: responseDescription,
                min: responseMin,
                max: responseMax,
                icon: responseIcon
            });
        })
        .catch((error) => {
            console.log(error);
        })
        return () => {
            cencelAxios();
        }
    }, [])
    return (
        <>
        <div className="header">
            <h1>Alger</h1>
            <p>{time}</p>
        </div>
        <hr></hr>
        <div className="content">
            <div className="content-left" style={{height: "170px"}}>
              <div className="content-left-left" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                 <p style={{fontSize: "5rem"}}>{temp.number}</p>
                 <p style={{fontSize: "1.4rem"}}>{temp.description}</p>
                 <div style={{display: "flex" }}>
                    <p>min:{temp.min}</p>
                    <p style={{color: "white", padding: "0px 5px"}}>|</p>
                    <p>max:{temp.max}</p>
                 </div>
              </div>
               <img src={`http://openweathermap.org/img/w/${temp.icon}.png`} style={{width: "120px", height: "120px"}}/>
            </div>
            <CloudIcon style={{fontSize: "10rem"}}></CloudIcon>
        </div>
        </>
    )
}