import Latest from "@/components/Posts/Latest";
import Top from "@/components/Posts/Top";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full min-w-screen flex min-h-screen p-8 pb-20 sm:p-20 flex-col">
        <main className="flex flex-row h-screen">
            <Latest/>
            <Top/>
        </main>

    </div>
  );
}
