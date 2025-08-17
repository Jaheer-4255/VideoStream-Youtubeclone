import React from 'react';
import { Copy, X } from 'lucide-react';

interface TextAreaProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder: string;
  readonly?: boolean;
  onCopy?: () => void;
  onClear?: () => void;
  maxLength?: number;
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  readonly = false,
  onCopy,
  onClear,
  maxLength = 5000,
  label
}) => {
  const handleCopy = async () => {
    if (value && onCopy) {
      try {
        await navigator.clipboard.writeText(value);
        onCopy();
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <textarea
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          readOnly={readonly}
          maxLength={maxLength}
          className={`w-full min-h-[120px] p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 transition-all duration-200 ${
            readonly
              ? 'bg-gray-50 border-gray-200 focus:ring-purple-500'
              : 'bg-white border-gray-300 focus:ring-blue-500 hover:border-gray-400'
          }`}
        />
        
        <div className="absolute bottom-2 right-2 flex gap-1">
          {value && onCopy && (
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-200 group"
              title="Copy text"
            >
              <Copy className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />
            </button>
          )}
          
          {value && onClear && !readonly && (
            <button
              onClick={onClear}
              className="p-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-200 group"
              title="Clear text"
            >
              <X className="h-4 w-4 text-gray-500 group-hover:text-red-500" />
            </button>
          )}
        </div>
        
        {!readonly && (
          <div className="absolute bottom-2 left-2 text-xs text-gray-400">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;