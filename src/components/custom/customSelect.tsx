import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from "@mui/material";
import type { CustomSelectProps } from "../../types/components/baseComponent";

export default function CustomSelect({
  label,
  labelId,
  value,
  onChange,
  options,
  ...props
}: CustomSelectProps & SelectProps) {
  return (
    <FormControl>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        value={value}
        onChange={onChange}
        {...props}
      >
        <MenuItem value="">Aucune</MenuItem>
        {options?.map((o: { id: string; label: string }) => (
          <MenuItem key={o.id} value={o.id}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
