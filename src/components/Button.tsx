import React from "react";
import Button from "@mui/material/Button";

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function CustomButton({ onClick, children }: Props) {
  return (
    <Button 
        variant="contained" 
        style={{ 
            backgroundColor: 'yellow', 
            color: 'black',
            borderRadius: 8,
            fontWeight: 600,
        }} 
        onClick={onClick}
        type="submit"
    >
      {children}
    </Button>
  );
}