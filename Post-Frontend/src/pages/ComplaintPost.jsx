import React, { useState } from 'react'; 
import { Card, CardContent, CardHeader } from '@/components/ui/card'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
import { Button } from '@/components/ui/button'; 
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'; 
import { ThumbsUp } from 'lucide-react';  

const ComplaintPost = ({ username, ref, title, description, image, avatar, initials, date, likes }) => {
   const [liked, setLiked] = useState(false);
   const [likeCount, setLikeCount] = useState(likes);
    
   const handleLike = () => {
     setLiked(!liked);
     setLikeCount(liked ? likeCount - 1 : likeCount + 1);
   };
    
   return (
     <Card className="max-w-lg mx-auto my-2">
       <CardHeader className="flex flex-row items-center justify-between">
         <div className="flex items-center space-x-4">
           <Avatar className="w-12 h-12">
             <AvatarImage src={avatar} alt="User" />
             <AvatarFallback>{initials}</AvatarFallback>
           </Avatar>
           <div>
             <p className="font-semibold">{username}</p>
             <p className="text-xs text-muted-foreground">Complaint Ref: {ref}</p>
           </div>
         </div>
       </CardHeader>
              
       <CardContent>
         <div className="mb-4">
           <h3 className="font-bold text-lg mb-2">{title}</h3>
           <p>{description}</p>
         </div>
                  
         <div className="grid grid-cols-1 gap-4 mb-4">
           <Dialog>
             <DialogTrigger asChild>
               <img
                  src={image}
                 alt="Complaint Image"
                  className="w-full max-w-[350px] h-auto object-cover cursor-pointer rounded-lg"
                />
             </DialogTrigger>
             <DialogContent className="max-w-4xl">
               <img
                  src={image}
                 alt="Full size"
                  className="w-auto max-w-full h-[500px] object-contain mx-auto"
               />
             </DialogContent>
           </Dialog>
         </div>
          
         <div className="flex items-center justify-between">
           <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center space-x-2">
             <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-blue-500 text-blue-500' : 'text-gray-500'}`} />
             <span>{likeCount}</span>
           </Button>
           <p className="text-sm text-muted-foreground">Filed on: {date}</p>
         </div>
       </CardContent>
     </Card>
   );
};

export default ComplaintPost;