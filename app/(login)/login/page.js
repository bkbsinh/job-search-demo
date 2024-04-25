import LoginForm from "@/components/mol/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-slate-300 min-h-screen flex flex-col justify-center space-y-6 lg:flex-row p-5">
      <div className="flex justify-center items-center lg:w-1/2 xl:w-3/5">
        <img src="/assets/dsa_logo.png" className="h-[120px] w-[auto]]" />
        <p className="text-5xl text-[#0b4358] text-center font-bold">
          WELCOME
        </p>
      </div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
