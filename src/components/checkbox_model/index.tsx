import * as React from 'react';
import { View, Checkbox, Label } from 'remax/wechat';
export interface CheckboxProps {
    name?: string;
    /** checkbox标识，选中时触发checkbox-group的 change 事件，并携带 checkbox 的 value 1.0.0  */
    value?: string;
    /** 是否禁用 1.0.0  */
    disabled?: boolean;
    /** 当前是否选中，可用来设置默认选中 1.0.0  */
    checked?: boolean;
    /** (default: #09BB07) checkbox的颜色，同css的color 1.0.0  */
    color?: string;
    extra?: React.ReactNode;
    onChange?: () => void;
}

const CheckboxModel = (props: CheckboxProps) => {
    const { color, name, value, checked = true, disabled, extra, onChange } = props
    return (
        <View className="checkbox-model padding-sm">
            <Label className="flex align-center" onClick={onChange}>
                <View className={`${!extra && 'flex-sub'}`}>
                    <Checkbox value={value} checked={checked} disabled={disabled} color={color} name={name} />
                </View>
                {extra && (
                    <View className="margin-left-sm flex-sub">
                        {extra}
                    </View>
                )}</Label>
        </View>
    );
};

export default CheckboxModel;