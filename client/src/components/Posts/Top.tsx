import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import code from "@/assets/Code.png";

export default function Top() {
    return (
        <div className="flex flex-col basis-1/3 h-full px-8">
            search posts before it
            <div className="w-full flex flex-col gap-5 items-center">
                <Card className="w-full">
                    <CardContent className="flex flex-row gap-5">
                        <div className="flex basis-1/5  h-full bg-yellow-300">
                            <Image
                                src={code}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className="flex flex-col basis-4/5">
                            <CardHeader className="grid gap-1 p-4">
                                <CardTitle>Product</CardTitle>
                                <CardDescription>Best product ever</CardDescription>
                            </CardHeader>
                        </div>
                    </CardContent>


                </Card>


            </div>

        </div>
    );
}