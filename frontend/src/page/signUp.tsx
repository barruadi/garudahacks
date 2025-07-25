import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

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
      // TODO: api call for login

    } catch (err: any) {

    } finally {

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

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
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
