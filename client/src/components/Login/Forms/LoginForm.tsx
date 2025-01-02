"use client"
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
import {useTranslations} from "next-intl";

const schema = z.object({
    email: z
        .string().min(1,"Email is required")
        .email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" })

});
export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {

    type LoginSchema = z.infer<typeof schema>;
    const {register, handleSubmit, setError,
        formState: { errors }, }
        = useForm<LoginSchema>({
        resolver: zodResolver(schema),
    })
    const router=useRouter();

    async function handleLogin(values:z.infer<typeof schema>){
        const data=await signIn("credentials",{
            email:values.email,
            password:values.password,
            redirect: false,
        });
        if (data?.error){
            setError("password", { type: "custom", message: data?.error })
        }else{
            router.push("/profile");
        }

    }
    const t = useTranslations('Auth')
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">{t('welcome')}</CardTitle>
                    <CardDescription>
                        {t('oAuthLogin')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form  onSubmit={handleSubmit(handleLogin)}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full" onClick={()=>{signIn("google")}}>
                                    <FontAwesomeIcon className="w-6 h-6" icon={faGoogle}/>
                                    {t('google')}
                                </Button>
                                <Button variant="outline" className="w-full" onClick={()=>{signIn("github")}}>
                                    <FontAwesomeIcon className="w-6 h-6" icon={faGithub}/>
                                    {t('github')}
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  {t('continue')}
                </span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">{t('email')}</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={t('exampleEmail')}
                                        required
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.email.message}
                                        </p>
                                    )}

                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">{t('password')}</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            {t('forgot')}
                                        </a>
                                    </div>
                                    <Input id="password" type="password" required  {...register("password")}/>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">
                                            {errors.password.message}
                                        </p>
                                    )}

                                </div>
                                <Button type="submit" className="w-full">
                                    {t('login')}
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                {t('noAccount')}{" "}
                                <a href="/signup" className="underline underline-offset-4">
                                    {t('signup')}
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                {t('policy.main')}{" "}<a href="#">{t('policy.service')}</a>{" "}{t('policy.and')}{" "}<a href="#">{t('policy.privacy')}</a>.
        </div>
        </div>
    )
}