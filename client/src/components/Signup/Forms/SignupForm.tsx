"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import createUser from "@/actions/client/create-user";
import {useTranslations} from "next-intl";


const schema = z.object({
    name: z.string().min(2, { message: "Full name must be at least 3 characters long" }) // Minimum length
        .max(100, { message: "Full name must not exceed 100 characters" }) // Maximum length
        .regex(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
            message: "Full name must include at least a first and last name",
        }),
    email: z
        .string().min(1,"Email is required")
        .email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // Uppercase
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // Lowercase
        .regex(/\d/, { message: "Password must contain at least one number" }) // Number
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message: "Password must contain at least one special character",
        }),
});

//edit confirm password maybe
export function SignupForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {



    type FormSchema = z.infer<typeof schema>;
    const {register, handleSubmit, setError,
        formState: { errors }, }
        = useForm<FormSchema>({
        resolver: zodResolver(schema),
    })

   const router=useRouter();

    async function handleSignup(values:z.infer<typeof schema>){
        const res=await createUser(values.name,values.email,values.password);
        if (res.ok) {
            router.push("/login")
        }else{
            const error=await res.json();
            setError("email", { type: "custom", message: error.message })
        }

    }
    const t = useTranslations('Auth')

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">{t('signup')}</CardTitle>

                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleSignup)}>
                        <div className="grid gap-6">
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">{t('name')}</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder={t('name')}
                                        required
                                        {...register("name")}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
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
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        {...register("password")} />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                                <Button type="submit" className="w-full" >
                                    {t('signup')}
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                {t('account')}{" "}
                                <a href="/login" className="underline underline-offset-4">
                                    {t('login')}
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