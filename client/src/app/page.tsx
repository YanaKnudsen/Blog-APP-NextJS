import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";


export default function Home() {
  return (
    <div className="w-full min-w-screen flex min-h-screen p-8 pb-20 sm:p-20 bg-amber-50 flex-col">
        <Navbar/>
        <main className="">
            <div>
                Hello
            </div>

        </main>
        <Footer/>

    </div>
  );
}
