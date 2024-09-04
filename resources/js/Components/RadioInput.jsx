import { forwardRef, useEffect } from "react";

export default forwardRef(function RadioInput(
    {
        type = "radio",
        className = "",
        options,
        isFocused = false,
        onChange,
        value,
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) input.current.focus();
    }, []);

    return (
        <div className={`flex items-center ${className}`}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className="inline-flex items-center mr-6"
                >
                    <input
                        id={option.value}
                        type={type}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                        className={`form-${type} h-4 w-4 text-indigo-600`}
                        ref={input}
                    />

                    <label htmlFor={option.value} className="ms-3">
                        <span className="block text-sm font-semibold text-gray-800">
                            {option.label}
                        </span>
                        {option.description && (
                            <span className="block text-sm text-gray-600">
                                {option.description}
                            </span>
                        )}
                    </label>
                </label>
            ))}
        </div>
    );
});
