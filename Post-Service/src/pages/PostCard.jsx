import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import React from "react";
  import PostImg from "../assets/Girl-Img.jpg";  
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Plus } from "lucide-react";


  export default function PostCard() {
  //   const [selectedFiles, setSelectedFiles] = useState([])
  // const fileInputRef = useRef(null)

  // const handlePlusClick = () => {
  //   // Trigger the hidden file input when plus icon is clicked
  //   fileInputRef.current.click()
  // }

  // const handleFileChange = (e) => {
  //   if (e.target.files) {
  //     // Convert FileList to array and store selected files
  //     const filesArray = Array.from(e.target.files)
  //     setSelectedFiles(filesArray)
  //   }
  // }
    return (
      <div className="flex justify-center items-center mt-[10%]">
        <Card className="w-[90%] md:w-[60%] lg:w-[40%]">
          <CardHeader className="p-0 pb-4">
          <div className="flex items-center space-x-4">
            <img src={PostImg} className="w-12 h-12 rounded-full" />
            <div>
              <div className="flex  flex-col">
                <CardTitle className="text-base">Krisha Shah</CardTitle>
                <CardDescription className="text-sm">Write your Complaint</CardDescription>
              </div>
            </div>
          </div>
          </CardHeader>
          <CardContent>
            {/* <Input   className="h-24 w-full text-left pt-3 align-top"  placeholder="Write your query here.."/> */}
            <textarea 
            className="h-24 w-full border rounded-md p-3 text-left resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your query here..">
          </textarea>
          <Plus size={24} className="text-gray-600" />
          </CardContent>
          <CardFooter className="flex justify-end">
                    <Button className="bg-blue-600 text-white px-6 py-2 rounded-full">
                        Post
                    </Button>
                </CardFooter>
        </Card>
      </div>
    );
  }
  