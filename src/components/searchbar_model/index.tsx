import * as React from 'react';
import { SearchBar } from 'anna-remax-ui';
import { View } from 'remax/wechat';

export interface Props {
    inputStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    value?: string;
    focus?: boolean;
    placeholder?: string;
    actionName?: string;
    keepShowActionButton?: boolean;
    hideActionButton?: boolean;
    size?: 'small' | 'large';
    shape?: 'square';
    onInput?: (value: string) => void;
    onClear?: (value: any) => void;
    onActionClick?: () => void;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
    onSubmit?: (value: string) => void;
}

const SearchbarModel = ({ style, inputStyle, value, placeholder = '搜索', focus, actionName, keepShowActionButton, hideActionButton, size, shape, onInput, onClear, onActionClick, onFocus, onBlur, onSubmit }: React.PropsWithChildren<Props>) => {
    
    return (
        <View className="searchbar-model">
            <SearchBar
                style={style}
                inputStyle={inputStyle}
                value={value}
                placeholder={placeholder}
                focus={focus}
                actionName={actionName}
                keepShowActionButton={keepShowActionButton}
                hideActionButton={hideActionButton}
                size={size}
                shape={shape}
                onActionClick={onActionClick}
                onFocus={onFocus}
                onBlur={onBlur}
                onClear={onClear}
                onInput={onInput}
                onSubmit={onSubmit}
            />
        </View>
    );
};

export default SearchbarModel;