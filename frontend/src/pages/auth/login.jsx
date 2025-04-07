import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { useToast } from "@/hooks/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  async function onSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await dispatch(loginUser(formData));
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message || "Server is Not Live Yet, Please Try Again Later",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-[#3f2a8f] to-[#431865] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20"
        >
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <motion.h1
                className="text-3xl font-bold text-white mb-2"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Welcome Back
              </motion.h1>
              <motion.p
                className="text-purple-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-white font-medium hover:text-purple-300 transition-colors"
                >
                  Sign up
                </Link>
              </motion.p>
            </motion.div>

            <CommonForm
              formControls={loginFormControls}
              buttonText={isSubmitting ? "Signing In..." : "Sign In"}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              customClasses={{
                form: "space-y-6",
                label: "block text-sm font-medium text-purple-100 mb-1",
                input: "w-full px-4 py-3 rounded-lg bg-black/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
                button: "w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center",
              }}
              disabled={isSubmitting}
            />
          </div>

          <motion.div
            className="bg-black/5 p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/auth/forgot-password"
              className="text-purple-200 text-sm hover:text-white transition-colors"
            >
              Forgot your password?
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default AuthLogin;