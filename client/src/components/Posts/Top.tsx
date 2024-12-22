import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import code from "@/assets/Code.png";

export default function Top() {
    return (
        <div className="flex flex-col basis-1/3 h-full px-8">
            search here
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-5">
                Top posts
            </h3>
            <div className="w-full flex flex-col gap-5 items-center">
                <Card className="w-full max-w-md rounded-lg shadow-md overflow-hidden">
                    <CardContent className="flex flex-row gap-1 py-4">
                        {/* Image Section */}
                        <div className="flex-shrink-0 w-1/2 h-1/2 rounded-md overflow-hidden">
                            <Image
                                src={code}
                                alt="Picture of the author"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="flex flex-col justify-center">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-lg font-semibold ">Title</CardTitle>
                                <CardDescription className="text-sm ">
                                   Authir and
                                </CardDescription>
                            </CardHeader>
                        </div>
                    </CardContent>
                </Card>


            </div>

        </div>
    );
}