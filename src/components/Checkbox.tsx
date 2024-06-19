interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const CustomCheckbox = ({ id, label, checked, onChange }: CustomCheckboxProps) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} className="hidden" />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="w-6 h-6 rounded-full border-2 border-white bg-white flex items-center justify-center">
          {checked && <div className="w-4 h-4 bg-primary-dark-blue rounded-full"></div>}
        </div>
        <span className="ml-2 text-sm ">{label}</span>
      </label>
    </div>
  );
};
