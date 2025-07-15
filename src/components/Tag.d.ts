import * as React from "react";
interface TagProps {
    label: string;
    selected?: boolean;
    onClick?: (label: string) => void;
    className?: string;
}
declare const Tag: React.FC<TagProps>;
export default Tag;
