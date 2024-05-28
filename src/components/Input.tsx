import React from "react";
import TextField from "@mui/material/TextField";

interface Props {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  props?: any;
}

export default function Input({
  label,
  value,
  onChange,
  type = "text",
  props,
}: Props) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      color="primary"
      fullWidth
      variant="outlined"
      style={{
        color: "#FFF",
      }}
      {...props}
    />
  );
}
