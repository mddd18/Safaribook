"use client";

import * as React from "react";
import { cn } from "./utils";

function ScrollArea({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="scroll-area"
      className={cn("relative overflow-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function ScrollBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return null;
}

export { ScrollArea, ScrollBar };
