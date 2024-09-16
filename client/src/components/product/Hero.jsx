"use client";
import Slider from "./Slider";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

const Hero = () => {
    return (
        <section>
            <div className="flex justify-center items-center overflow-hidden mx-16 mb-10 mt-8">
                <div className="hidden md:block md:w-1/3  md:h-[500px] m-4">
                    <HeroLeft />
                </div>
                <div className="md:w-1/2  bg-gray-300  h-[280px] md:h-[450px] xl:h-[500px] w-full aspect-[4/3] ">
                    <Slider />
                </div>
                <div className="hidden md:block w-1/3 h-[500px]  m-4">
                    <HeroRight />
                </div>
            </div>
        </section>
    );
};

export default Hero;
