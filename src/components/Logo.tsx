import React from "react";
import logoMinhaObra from "@/assets/minha-obra-logo.png";
import { cn } from "@/lib/utils";

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: "default" | "compact";
}

export const Logo: React.FC<LogoProps> = ({ variant = "default", className, ...props }) => {
  const sizeClass = variant === "compact" ? "h-7" : "h-8";

  return (
    <div className="flex items-center gap-2">
      <img
        src={logoMinhaObra}
        alt="Minha Obra - Controle simples da sua construção"
        className={cn("w-auto", sizeClass, className)}
        {...props}
      />
    </div>
  );
};

export default Logo;
