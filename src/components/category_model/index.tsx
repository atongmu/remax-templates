import * as React from 'react';
import { Grid } from 'anna-remax-ui';
import { View, Image } from 'remax/wechat';

import './index.less'

export interface Props {
    items: Array<any>;
    detail: () => void;
}

const CategoryModel = ({ items, detail }: React.PropsWithChildren<Props>) => {
    const renderGridItem = (items: any, index?: number) => (
        <View className="text-center margin-bottom-sm" onClick={detail}>
            <Image className="category-image" src={items.image} mode="widthFix" />
            <View className="category-title">{items.title}</View>
        </View>
    );
    return (
        <View className="category-model">
            <Grid data={items} columns={4}>
                {renderGridItem}
            </Grid>
        </View>
    );
};

export default CategoryModel;