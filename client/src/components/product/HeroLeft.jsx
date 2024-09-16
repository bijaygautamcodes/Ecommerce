import Image from "next/image";

const HeroLeft = () => {
    return (
        <div className="relative h-full w-full flex flex-col gap-4">
            <div className=" relative h-2/3  overflow-clip cursor-pointer">
                <div className="flex md:flex-col pl-6 h-full bg-[#f0d90d]">
                    <Image
                        src={"/images/offer-banner-left.jpg"}
                        fill={true}
                        alt="offer image"
                        className="object-cover hover:scale-110 transform transition duration-500 ease-in-out"
                    />
                </div>
            </div>
            <div className=" bg-[#f0d90d] h-1/3 ">
                <div className="flex-1  md:flex-col pl-6 h-full">
                    <div className="pr-4 pt-6 flex-1 h-full">
                        <h3 className=" md:text-xl  lg:text-3xl xl:text-5xl font-bold text-gray-800 dark:text-white">
                            200 +
                        </h3>
                        <p className="lg:mt-2  md:text-sm lg:text-lg xl:text-xl text-white font-light ">
                            Clothes, Electronics and Other materials
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroLeft;
