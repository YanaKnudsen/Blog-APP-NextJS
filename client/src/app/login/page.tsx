import {LoginForm} from "@/components/ui/custom/login-form";

export default function LoginPage() {
    return (
        <div className="w-full min-w-screen flex p-8 pb-20 sm:p-20 flex-col">
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
          <LoginForm/>
            </div>


        </div>
    );
}
