

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MyComponent from "../components/ui/MyComponent";

const API_URL = "http://localhost:8080/Branchsignup";

export function BranchSignup({ className, ...props }) {
  const [formData, setFormData] = useState({
    branch_name: "",
    phone: "",
    location: "",
    email: "",
    idProof: null,
    password: "",
    privateID: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("branch_name", formData.branch_name);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("password", formData.password);
  formDataToSend.append("idProof", formData.idProof); // File upload
  formDataToSend.append("location", formData.location);
  formDataToSend.append("phone", formData.phone);
  formDataToSend.append("privateID", formData.privateID);

  console.log("Sending Data:", formDataToSend);

  try {
    const response = await fetch("http://localhost:8080/Branchsignup", {
      method: "POST",
      body: formDataToSend, // No headers needed, browser sets them
    });

    const result = await response.json();
    console.log("Response from API:", result);
  } catch (error) {
    console.error("Error connecting to API:", error);
  }
};

  return (
    <div className={cn("w-650px h-350px flex flex-col gap-6 mt-10", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className={cn("text-2xl")}>Signup</CardTitle>
          <CardDescription>Signup to access your profile!!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className={cn("grid gap-6 grid-cols-2")}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="branch_name">
                    Company Name
                  </Label>
                  <Input id="branch_name" name="branch_name" type="text" placeholder="Enter Company name" onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="phone">
                    Contact
                  </Label>
                  <Input id="phone" name="phone" type="number" placeholder="Enter branch contact no." onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="location">
                    Location
                  </Label>
                  <MyComponent />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="email">
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" placeholder="Enter Branch email" onChange={handleChange} required />
                </div>
              </div>

              <div className={cn("grid gap-6")}>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="idProof">
                    ID Proof
                  </Label>
                  <Input id="idProof" name="idProof" type="file" accept="application/pdf" onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="password">
                    Password
                  </Label>
                  <Input id="password" name="password" type="password" placeholder="Enter Password" onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label className={cn("text-xl")} htmlFor="privateID">
                    Private ID
                  </Label>
                  <Input id="privateID" name="privateID" type="text" placeholder="Enter Branch ID" onChange={handleChange} required />
                </div>
              </div>
            </div>
            {/* <br />
            <div className="text-center">
              <Button type="submit" className="w-[60%]">
                Signup
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div> */}
    <br></br>
            <div
                className=" relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <br></br>
              <div className="grid gap-6">
                
                <div className="flex items-center flex-col gap-4">
                {/* <Button variant="outline" className="w-[60%] h-[45px]">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="55" height="55" viewBox="0 0 27 27">
    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
</svg>
                  SignUp with GitHub
                </Button> */}
                <Button variant="outline" className="w-[60%] h-[45px]">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="55" height="55" viewBox="0 0 45 45">
<path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
                  SignUp with Google
                </Button>
              </div>
              <div className="flex items-center flex-col gap-4">
                <Button type="submit" className="w-[60%]" >
                  Signup
                </Button>
                </div>
              </div>
              <div className="text-center text-sm mt-7px">
                Already a user?{" "}
                <a href="http://localhost:5173/BranchLogin" className="underline underline-offset-4">
                  Login
                </a>
              </div>
          </form>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default BranchSignup;
