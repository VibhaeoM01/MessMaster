import FAQs from "../../components/FAQs/FAQs";
import HeroSection from "../../components/Herosection/heroSection";
import ShowCard from "../../components/ShowcaseCards/ShowCard";
import "./homePage.scss";

function HomePage() {
  
  return (
    <div className="homePage">
        <HeroSection/>
        <ShowCard/>
        <FAQs/>
        {/* <Foote  /> */}
    </div>
  );
}

export default HomePage;