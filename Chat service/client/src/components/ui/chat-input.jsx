import React, { forwardRef } from "react";
import { Textarea } from "./textarea";
import { cn } from "../../lib/utils";

const ChatInput = forwardRef(({ className, ...props }, ref) => (
  <Textarea
    autoComplete="off"
    ref={ref}
    name="message"
    className={cn(
      "max-h-12 px-4 py-3 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center h-16 resize-none",
      className
    )}
    {...props}
  />
));

export default ChatInput;
