export interface Option {
  label: string;
  value: string;
  isDisabled?: boolean;
  description?: string;
}

export interface GroupedOptions {
  label?: string;
  options: Option[];
}
