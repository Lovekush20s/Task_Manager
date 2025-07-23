import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform-gpu",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:scale-105 hover:shadow-neon active:scale-95 border border-primary/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 active:scale-95",
        outline: "border border-border bg-card/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:border-primary/50 active:scale-95",
        secondary: "bg-gradient-secondary text-secondary-foreground hover:scale-105 hover:shadow-accent active:scale-95 border border-secondary/20",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        glass: "bg-gradient-glass backdrop-blur-lg border border-white/20 text-foreground hover:bg-white/20 hover:scale-105 hover:shadow-glass active:scale-95",
        neon: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-neon hover:scale-105 active:scale-95",
        floating: "bg-gradient-card backdrop-blur-sm border border-border shadow-depth hover:shadow-3d hover:scale-105 active:scale-95 hover:-translate-y-1"
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
