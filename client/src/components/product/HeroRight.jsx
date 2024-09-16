import Image from "next/image";

const HeroRight = () => {
    return (
        <div className="flex flex-col gap-4  h-full">
            <div className=" relative flex-1 bg-[#0dcaf0] overflow-clip cursor-pointer">
                <div className="flex md:flex-col pl-6 h-full">
                    <Image
                        src={"/images/offer-banner-right.jpg"}
                        fill={true}
                        alt="offer image"
                        className="object-cover hover:scale-110 transform transition duration-500 ease-in-out"
                    />
                </div>
            </div>

            <div className=" bg-[#0dcaf0] h-1/3 ">
                <div className="flex-1  md:flex-col pl-6 h-full">
                    <div className="pr-4 pt-6 flex-1 h-full">
                        <h3 className=" md:text-xl  lg:text-3xl xl:text-5xl font-bold text-gray-800 dark:text-white">
                            500 +
                        </h3>
                        <p className="lg:mt-2  md:text-sm lg:text-lg xl:text-xl text-white font-light ">
                            It's raining gifts this weekend!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroRight;
