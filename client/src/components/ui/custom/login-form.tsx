import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub,faGoogle } from '@fortawesome/free-brands-svg-icons'
import {signIn} from "next-auth/react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";

const LoginSchema = z.object({
    email: z
        .string().min(1,"Email is required")
        .email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" })

});
export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {

    const form= useForm<typeof LoginSchema>({
        resolver: zodResolver(LoginSchema),
    });
    const router=useRouter();

    async function handleLogin(values:z.infer<typeof LoginSchema>){
        console.log("handling login",values);
        const data=await signIn("credentials",{
            email:values.email,
            password:values.password,
            redirect: false,
        });
        console.log(data);
        if (data?.error){
            console.log(data?.error);
        }else{
            console.log("logindata",data)
            router.push("/Profile");
        }


    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form  onSubmit={form.handleSubmit(handleLogin)}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full" onClick={()=>{signIn("google")}}>
                                    <FontAwesomeIcon className="w-6 h-6" icon={faGoogle}/>
                                    Login with Google
                                </Button>
                                <Button variant="outline" className="w-full" onClick={()=>{signIn("github")}}>
                                    <FontAwesomeIcon className="w-6 h-6" icon={faGithub}/>
                                    Login with GitHub
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        {...form.register("email")}
                                    />
                                    {form.formState.errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {form.formState.errors.email.message}
                                        </p>
                                    )}

                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input id="password" type="password" required  {...form.register("password")}/>
                                    {form.formState.errors.password && (
                                        <p className="text-red-500 text-sm">
                                            {form.formState.errors.password.message}
                                        </p>
                                    )}

                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="/signup" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}