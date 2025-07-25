import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { API_BASE_URL } from "@/config/api"

const signUpPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()
  
  const handleBack = () => {
    navigate(-1);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      e.preventDefault()
      setLoading(true)

      // Check if passwords match
      if (password !== confirmPassword) {
        setLoading(false)
        toast.error("Passwords do not match")
        return
      }

      const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Login failed");
      }

      toast.success("Sign up success!");
      navigate("/")

    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col h-screen justify-center bg-[#FFFCEE] px-6">
      <motion.img 
        src="/assets/img/bg-signin.png" 
        alt="" 
        className="opacity-10 absolute top-0 left-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <div className="absolute top-6 left-4" onClick={handleBack}>
        <ChevronLeft className="text-[#B48B57]" />
      </div>

      {/* Sign In Form */}
      <div className="flex flex-col items-center mt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-semibold mb-8 font-rye" style={{ transform: 'scale(1.4)',}}>Sign Up</h1>
        </motion.div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 z-10">
          <div>
            <Label htmlFor="username" className="text-sm">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="confirm-password" className="text-sm">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="password"
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full !bg-[#B48B57] hover:!bg-[#a37949] !text-white"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </Button>
        </form>
      </div>

      {/* Bottom Illustration (replace with actual image or component) */}
      <div className="w-full h-32 bg-no-repeat bg-contain bg-bottom"
        style={{ backgroundImage: "url('/images/indonesia-map.png')" }}
      />
    </div>
  )
}

export default signUpPage
