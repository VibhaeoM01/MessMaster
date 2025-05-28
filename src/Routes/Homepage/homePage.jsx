import Chatbot from "../../components/chatbot/chatbot";
import Contactusform from "../../components/ContactUs/contactusform";
import FAQs from "../../components/FAQs/FAQs";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/Herosection/heroSection";
import ShowCard from "../../components/ShowcaseCards/ShowCard";
import "./homePage.scss";

function HomePage() {
  
  return (
    <div className="homePage">
        <Chatbot/>
        <HeroSection/>
        <ShowCard/>
        <Contactusform/>
        <FAQs/>
        <Footer/>
    </div>
  );
}

export default HomePage;