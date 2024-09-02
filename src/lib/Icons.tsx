import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBackward, faCaretLeft, faCaretRight, faEllipsisH, faForward, faGrinHearts, faHeart, faHeartBroken, faHeartCrack, faMusic, faPause, faPlay, faSearch, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ViewStyle } from 'react-native';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons/faHeartCircleXmark';

interface IconProps {
    size?: number;
    color?: string;
    style?: ViewStyle;
    className?: string;
}

export const Icons: Record<string, React.FC<IconProps>> = {
    heart: (props) => <FontAwesomeIcon icon={faHeart as IconProp} {...props} />,
    playlist: (props) => <FontAwesomeIcon icon={faList as IconProp} {...props} />,
    music: (props) => <FontAwesomeIcon icon={faMusic as IconProp} {...props} />,
    artists: (props) => <FontAwesomeIcon icon={faUsers as IconProp} {...props} />,
    search: (props) => <FontAwesomeIcon icon={faSearch as IconProp} {...props} />,
    cross: (props) => <FontAwesomeIcon icon={faXmark as IconProp} {...props} />,
    dots: (props) => <FontAwesomeIcon icon={faEllipsisH as IconProp} {...props} />,
    play: (props) => <FontAwesomeIcon icon={faPlay as IconProp} {...props} />,
    pause: (props) => <FontAwesomeIcon icon={faPause as IconProp} {...props} />,
    previous: (props) => <FontAwesomeIcon icon={faBackward as IconProp} {...props} />,
    next: (props) => <FontAwesomeIcon icon={faForward as IconProp} {...props} />,
    heart_solid: (props) => <FontAwesomeIcon icon={faHeart as IconProp} {...props} />,
    heart_regular: (props) => <FontAwesomeIcon icon={faHeartBroken as IconProp} {...props} />,
};

interface IconComponentProps { 
    iconName: string;
    size: number;
    color: string; 
    className?: string; 
    style?: any;
}
export const Icon = ({ iconName, size, color, className }: IconComponentProps) => {
    const IconComponent = Icons[iconName];
    return <IconComponent className={className} size={size} color={color} />;
};

