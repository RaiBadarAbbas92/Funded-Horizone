const InputField = ({ label, type, placeholder, value, onChange }) => {
    return (
      <div className="flex flex-col mb-4">
        <label className="text-orange-400 text-sm font-semibold mb-2">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-md px-4 py-2"
        />
      </div>
    );
  };
  
  export default InputField;
  