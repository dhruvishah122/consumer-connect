import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useRef } from "react";
import PostImg from "../assets/Girl-Img.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperclipIcon, Image, Video, X } from "lucide-react";

export default function PostCard() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const toggleMediaOptions = () => {
    setShowMediaOptions(!showMediaOptions);
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
    setShowMediaOptions(false);
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
    setShowMediaOptions(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-center items-center mt-[10%]">
      <Card className="w-[90%] md:w-[60%] lg:w-[40%]">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center space-x-4">
            <img src={PostImg} className="w-12 h-12 rounded-full" />
            <div>
              <div className="flex flex-col">
                <CardTitle className="text-base">Krisha Shah</CardTitle>
                <CardDescription className="text-sm">Write your Complaint</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <textarea
            className="h-24 w-full border rounded-md p-3 text-left resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your query here.."
          ></textarea>
          
          {/* Display preview of selected files */}
          {selectedFiles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="w-16 h-16 border rounded overflow-hidden flex items-center justify-center bg-gray-100">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="max-w-full max-h-full object-cover"
                      />
                    ) : (
                      <Video className="text-gray-500" />
                    )}
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Single attachment button */}
          <div className="mt-3 relative">
            <button
              onClick={toggleMediaOptions}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
            >
              <PaperclipIcon size={20} />
              <span className="text-sm">Attach</span>
            </button>
            
            {/* Dropdown for media options */}
            {showMediaOptions && (
              <div className="absolute mt-1 bg-white shadow-lg rounded-md p-2 z-10 border">
                <button
                  onClick={handleImageClick}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full text-left"
                >
                  <Image size={18} />
                  <span>Image</span>
                </button>
                <button
                  onClick={handleVideoClick}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full text-left"
                >
                  <Video size={18} />
                  <span>Video</span>
                </button>
              </div>
            )}
            
            {/* Hidden file inputs */}
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              multiple
            />
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleFileChange}
              accept="video/*"
              className="hidden"
              multiple
            />
          </div>
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