import PostCard from "../../../../Post-Service/client/src/pages/PostCard";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
export default function Post(){
    return(
        <Routes>
       <Route path=":email/post" element={<PostCard className="shadow-lg shadow-inner border-2 border-gray-390"/>}/>
       </Routes>
    )
}