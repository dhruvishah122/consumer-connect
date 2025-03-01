import React from "react";

export default function SearchComponent() {
    return (
        <form className="max-w-sm px-4">
            <div className="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 22 22"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-1 pl-10 pr-2 text-gray-500 border rounded-md outline-none bg-white-50 focus:bg-white focus:border-indigo-400"
                />
            </div>
        </form>
    );
}