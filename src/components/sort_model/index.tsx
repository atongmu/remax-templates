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
const SortModel = ({ options, onChange, onChangeParentOption }: React.PropsWithChildren<Props>) => {
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
    const renderGridItem = (item: any, index?: number) => (
        <View className="text-center margin-bottom-sm ">
            <View style={{ width: "100rpx", height: '100rpx', margin: '0 auto' }}>
                <Image style={{ width: '100%', height: '100%' }} src={item.image} />
            </View>
            <View className="text-center">{item.value}</View>
        </View>
    );
    return (
        <View className="sort-model">
            <View className="sort-left">
                <ScrollView scrollY={true} style={{ height: '100%' }}>
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
            <View className="sort-right">
                <ScrollView scrollY={true} style={{ height: '100%' }}>
                    <Grid data={childrenData} columns={3}>
                        {renderGridItem}
                    </Grid>
                    {/* {childrenData.map((item, index) => {
                        return (
                            <View
                                key={index}
                                className="sort-item"
                                onClick={() => handleClickChildrenOption(item)}
                            >
                                {item.value}
                            </View>
                        )
                    })} */}
                </ScrollView>
            </View>
        </View>
    );
};

export default SortModel;