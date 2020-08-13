import * as React from 'react';
import { Grid } from 'anna-remax-ui';
import { View, Image } from 'remax/wechat';

import './index.less'

export interface Props {
    items: Array<any>,
    detail: () => void,
}

const CategoryModel = (props: Props) => {
    const { items, detail } = props
    const renderGridItem = (items: any, index?: number) => (
        <View className="text-center" onClick={detail}>
            <Image className="category-image" src={items.image} mode="widthFix" />
            <View className="category-title">{items.title}</View>
        </View>
    );
    return (
        <View className="category-model">
            <Grid data={items} columns={3}>
                {renderGridItem}
            </Grid>
        </View>
    );
};

export default CategoryModel;