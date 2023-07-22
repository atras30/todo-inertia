export default function InputLabel({ value, className = '', children, required, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-800 ` + className}>
            {value ? value : children} {required && <span className="text-lg font-bold text-red-600">*</span>}
        </label>
    );
}
