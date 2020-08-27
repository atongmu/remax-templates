import * as React from 'react';
import { View, Input } from 'remax/one';
export interface InputProps {
    label?: React.ReactNode;
    name?: string;
    type?: 'text' | 'number';
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    className?: string;
    inputAlign?: string;
    icon?: string;
    disabled?: boolean;
    password?: boolean;
    border?: boolean;
    focus?: boolean;
    extra?: React.ReactNode;
    onInput?: (e: any) => void;
    onConfirm?: (e: any) => void;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
}

const InputModel = (props: InputProps) => {
    const { label, name, value, type, border = true, className, defaultValue, password, disabled, focus, placeholder, extra, onInput, onConfirm, onFocus, onBlur } = props
    return (
        <View className={`input-model flex align-center padding-sm ${border && 'solid-bottom'}`}>
            {label && (
                <View className="margin-right-sm" style={{ width: '190rpx' }}>
                    {label}
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
                    placeholder={placeholder}
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