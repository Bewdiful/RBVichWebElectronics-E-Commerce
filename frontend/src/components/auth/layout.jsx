import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-r from-[#3f2a8f] to-[#431865] text-white">
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-gradient-to-r from-[#3f2a8f] to-[#431865]  text-white">
        <div className="max-w-md space-y-6 text-center text-primary-foreground bg-gradient-to-r from-[#3f2a8f] to-[#431865]  text-white">
          <h1 className="text-4xl font-extrabold  tracking-tight bg-gradient-to-r from-[#3f2a8f] to-[#431865]  text-white">
            Welcome to RBVichWebElectronics
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-[#3f2a8f] to-[#431865]  text-white" >
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
