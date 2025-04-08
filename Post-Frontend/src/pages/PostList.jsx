import React from 'react';
import ComplaintPost from './ComplaintPost';
import ReceAppl from "../assets/images/rec-appl.png";
import AvatarImg from "../assets/images/avatar.png";
import InternetBill from "../assets/images/internet-bill.png";
import LaptopBill from "../assets/images/laptop-bill.png";

const posts = [
  {
    username: "Kukie",
    ref: "#CC2024-5678",
    title: "Faulty Product Complaint",
    description: "Purchased a kitchen appliance that stopped working after two weeks...",
    image: ReceAppl,
    avatar: AvatarImg,
    initials: "K",
    date: "27 March 2025",
    likes: 42
  },
  {
    username: "Dhruvi Shah",
    ref: "#CC2024-7890",
    title: "Damaged Laptop Screen",
    description: "Received a laptop with a cracked screen upon delivery. Requesting replacement...",
    image: LaptopBill,
    avatar: AvatarImg,
    initials: "JD",
    date: "25 March 2025",
    likes: 30
  },
  {
    username: "Maahi Vaghela",
    ref: "#CC2024-9012",
    title: "Internet Service Issue",
    description: "Internet speed is much lower than promised. Need immediate resolution.",
    image: InternetBill,
    avatar: AvatarImg,
    initials: "AS",
    date: "24 March 2025",
    likes: 18
  }
];

const PostList = () => {
  return (
    <div className="max-w-2xl mx-auto h-[600px] overflow-visible-y-auto p-4 space-y-4">
      {posts.map((post, index) => (
        <ComplaintPost key={index} {...post} />
        
    ))}
    </div>
  );
};

export default PostList;
