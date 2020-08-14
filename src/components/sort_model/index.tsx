import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid } from 'anna-remax-ui';
import { View, ScrollView, Image } from 'remax/wechat';

import './index.less'
export interface OptionProps {
    key: string;
    value: string;
    children?: OptionProps[];
}
export interface Props {
    options: OptionProps[],
    value: string[],
    onChange?: (value: any, valueStr?: string) => void;
    onChangeParentOption?: (e: any) => void;
}
let currentParent: any = null;
const SortModel = (props: Props) => {
    const { options, onChange, onChangeParentOption } = props
    const [parentData, setParentData] = useState<OptionProps[]>([]);
    const [childrenData, setChildrenData] = useState<OptionProps[]>([]);
    const [activeParent, setActiveParent] = useState('');

    useEffect(() => {
        if (options.length > 0) {
            const data = options[0].children || [];
            currentParent = options[0];
            setActiveParent(currentParent.key);
            setParentData(options);
            setChildrenData(data);
        }
    }, [options]);

    const handleClickParentOption = (option: OptionProps) => {
        const data = option.children || [];
        currentParent = option;
        setChildrenData(data);
        setActiveParent(option.key);
        onChangeParentOption?.(option);
    };

    const handleClickChildrenOption = (option: OptionProps) => {
        onChange?.([currentParent.key, option.key], `${currentParent.value} ${option.value}`);
    };

    return (
        <View className="sort-model">
            <View className="sort-left">
                <ScrollView scroll-y="true" style={{ height: '100%' }}>
                    {options.map((item, index) => {
                        return (
                            <View
                                key={index}
                                className={`sort-item ${activeParent === item.key && 'active'}`}
                                onClick={() => handleClickParentOption(item)}
                            >
                                {item.value}
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View className="sort-right"></View>
        </View>
    );
};

export default SortModel;