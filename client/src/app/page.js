import Header from "@/components/Header";
import AllProducts from "@/components/product/AllProducts";
import Hero from "@/components/product/Hero";
import ProductCard from "@/components/product/ProductCard";
import { getProducts, getTopProducts } from "@/services/product.service";

export default async function Home() {
    const products = (await getProducts()) ?? [];
    const topProducts = (await getTopProducts()) ?? [];
    return (
        <main className="">
            <Header />
            <Hero />
            <section
                className="relative isolate flex flex-col justify-start items-start p-6 scroll-m-20"
                id="top-products"
            >
                <div className="h-full w-full">
                    <div className="flex flex-col justify-center items-start  max-w-6xl mx-auto">
                        <div className="max-w-xl ">
                            <h2 className="mb-4 text-4xl tracking-tight font-bold">
                                Top Rated Products
                            </h2>
                            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                                Shop hundreds of products worldwide.
                            </p>
                        </div>
                        <div className="flex gap-6">
                            {topProducts.map((product, index) => (
                                <ProductCard key={index} data={product} />
                            ))}
                        </div>

                        <AllProducts data={products} />
                    </div>
                </div>
            </section>
        </main>
    );
}
