import * as React from 'react';
import { View, Switch, Label } from 'remax/wechat';
export interface Props {
    name?: string;
    /** (default: false) 是否选中 1.0.0 */
    checked?: boolean;
    /** (default: false) 是否禁用 1.0.0 */
    disabled?: boolean;
    /** #04BE02 switch 的颜色，同 css 的 color 1.0.0 */
    color?: string;
    /** checked 改变时触发 change 事件，event.detail={ value} 1.0.0 */
    onChange?: (event: any) => any;
    extra?: React.ReactNode;
}

const SwitchModel = ({ color, name, checked = true, disabled, extra, onChange }: React.PropsWithChildren<Props>) => {
    
    return (
        <View className="switch-model padding-sm">
            <Label className="flex align-center">
                {extra && (
                    <View className="flex-sub">
                        {extra}
                    </View>
                )}
                <View className="margin-left-sm">
                    <Switch checked={checked} disabled={disabled} color={color} name={name} onChange={onChange} />
                </View>
            </Label>
        </View>
    );
};

export default SwitchModel;