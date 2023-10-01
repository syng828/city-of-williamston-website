import { Link } from "react-router-dom";
import { useContext } from "react";
import Navigation from "../components/Navigation";

//this is the homepage
const Home = () => { 
    return (
        <div className= "home">
            <Navigation/>
            <p>Welcome</p>
            <p>Our goal is to provide information about our community for residents and visitors to learn about who we are and what we can provide. This will be an ongoing project with updates and additions as we go along, so check back often! </p>
            <h1>WILLIAMSTON CITY HALL</h1>
            <p>161 E Grand River Ave, Williamston, MI 48895</p>
            <p>517-655-2774; Fax-517-655-2797; info@williamston-mi.us</p>
            <p>Office hours, 8am-5pm, Monday-Friday </p>
            <p>A locked drop box is available near the front entrance of City Hall for your convenience.</p>
        </div>
    )
}
export default Home; 