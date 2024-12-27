import clsx from 'clsx';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { inputStyles, inputWrapperStyles } from './inputStyles';
import { InputProps } from './types';
import { Eye, EyeOff } from 'lucide-react';

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  placeholder,
  error,
  variant,
  className,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isPasswordInput = type === 'password';
  const inputType = isPasswordInput && isPasswordVisible ? 'text' : type;

  return (
    <div className={twMerge(clsx(inputWrapperStyles({ variant })), 'relative')}>
      {label && (
        <label
          htmlFor={id}
          className={clsx('text-logo pl-3', variant === 'signin' && 'absolute top-1')}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        className={twMerge(clsx(inputStyles({ variant }), className))}
        {...props}
      />
      {isPasswordInput && (
        <button
          type="button"
          className="absolute right-5 bottom-5 text-lightGray hover:text-darkGray"
          onClick={() => setIsPasswordVisible(prev => !prev)}
        >
          {isPasswordVisible ? <EyeOff className=" h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
      {/* [임시 코드] 사용할 때 맞춰 수정해야 함 */}
      {error && <p className="text-logo text-sm">{error}</p>}
    </div>
  );
};

export default Input;
