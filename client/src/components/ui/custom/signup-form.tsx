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
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {FormEvent} from "react";
import {useRouter} from "next/navigation";


const FormSchema = z.object({
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

//add confirm password maybe
export function SignupForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {


   const form= useForm<typeof FormSchema>({
        resolver: zodResolver(FormSchema),
    });

   const router=useRouter();

    async function handleSignup(values:z.infer<typeof FormSchema>){
      const res=await fetch("/api/user",{
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              name:values.name,
              email:values.email,
              password:values.password
          })
        })
        if (res.ok) {
            router.push("/login")
        }else{
            console.error("Registration failed")
            //show error message here from res
        }


    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Sign up</CardTitle>

                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(handleSignup)}>
                        <div className="grid gap-6">
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Full name"
                                        required
                                        {...form.register("name")}
                                    />
                                    {form.formState.errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {form.formState.errors.name.message}
                                        </p>
                                    )}
                                </div>
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
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        {...form.register("password")} />
                                    {form.formState.errors.password && (
                                        <p className="text-red-500 text-sm">
                                            {form.formState.errors.password.message}
                                        </p>
                                    )}
                                </div>
                                {/*   <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Confirm your password</Label>
                                </div>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    {...form.register("confirmPassword")} />
                                {form.formState.errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">
                                        {form.formState.errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>*/
                            }
                                <Button type="submit" className="w-full" >
                                    Sign up
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <a href="/login" className="underline underline-offset-4">
                                    Log in
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