import * as React from 'react';
import { View, Input } from 'remax/one';
export interface Props {
    label?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    defaultValue?: string;
    value?: string;
    name?: string;
    type?: 'text' | 'number';
    password?: boolean;
    placeholder?: string;
    placeholderStyle?: React.CSSProperties;
    disabled?: boolean;
    maxlength?: number;
    focus?: boolean;
    align?: 'left' | 'center' | 'right';
    icon?: string;
    required?: boolean;
    border?: boolean;
    extra?: React.ReactNode;
    onInput?: (e: any) => void;
    onConfirm?: (e: any) => void;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
}

const InputModel = ({ label, name, value, type, border = true, maxlength, required = false, align = 'left', className, defaultValue, password, disabled, focus, placeholder, placeholderStyle, extra, onInput, onConfirm, onFocus, onBlur }: React.PropsWithChildren<Props>) => {

    return (
        <View className={`input-model flex align-center padding-sm ${border && 'solid-bottom'}`}>
            {label && (
                <View className="margin-right-sm flex align-center" style={{ width: '5.63rem' }}>
                    {required && (
                        <View className="text-red">*</View>
                    )}
                    <View className={`flex-sub text-${align}`}>{label}</View>
                </View>
            )}
            <View className="flex-sub">
                <Input
                    name={name}
                    disabled={disabled}
                    value={value}
                    type={type}
                    className={className}
                    defaultValue={defaultValue}
                    password={password}
                    focus={focus}
                    maxLength={maxlength}
                    placeholder={placeholder}
                    placeholderStyle={placeholderStyle}
                    onInput={onInput}
                    onConfirm={onConfirm}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </View>
            {extra && (
                <View className="margin-left-sm">
                    {extra}
                </View>
            )}
        </View>
    );
};

export default InputModel;