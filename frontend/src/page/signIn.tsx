import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const signInPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  
  const handleBack = () => {
    navigate(-1);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: change to env process
      const res = await fetch("http://localhost:8001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await res.json();
      const token = data.data.token;

      localStorage.setItem("token", token);

      toast.success("Login successful")
      navigate("/map");
      
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-screen justify-between bg-[#FFFCEE] px-6">
      {/* Back Icon */}
      <div className="absolute top-6 left-4" onClick={handleBack}>
        <ChevronLeft className="text-[#B48B57]" />
      </div>

      {/* Sign In Form */}
      <div className="flex flex-col items-center mt-24">
        <h1 className="text-4xl font-semibold mb-8">Sign In</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <div>
            <Label htmlFor="username" className="text-sm">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="kangkung"
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

export default signInPage
