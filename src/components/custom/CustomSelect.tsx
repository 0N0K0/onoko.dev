import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type FormControlProps,
} from "@mui/material";
import type { CustomSelectProps } from "../../types/components/baseComponentTypes";

export default function CustomSelect({
  label,
  labelId,
  value,
  onChange,
  options,
  ...props
}: CustomSelectProps & FormControlProps) {
  return (
    <FormControl fullWidth {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        value={value}
        onChange={onChange}
        multiple={Array.isArray(value) ? true : false}
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
