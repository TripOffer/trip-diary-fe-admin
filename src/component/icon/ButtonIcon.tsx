import type {ButtonProps, TooltipProps} from "antd";
import type {CSSProperties} from "react";
import {Button as AButton} from "antd";
import {Tooltip as ATooltip} from "antd";
import SvgIcon from "@/component/icon/SvgIcon.tsx";

interface Props extends Omit<ButtonProps, 'icon' | 'iconPosition'> {
    children?: React.ReactNode;
    /** Button class */
    className?: string;
    /** Iconify icon name */
    icon?: string;
    style?: CSSProperties;
    /** Tooltip content */
    tooltipContent?: string;
    /** Tooltip placement */
    tooltipPlacement?: TooltipProps['placement'];
    /** Trigger tooltip on parent */
    triggerParent?: boolean;
    zIndex?: number;
}

const computeClass = (className: string) => {
    let cls = className;
    if(!cls.includes('h-')) {
        cls += ' h-36px'
    }
    if(!cls.includes('text-')) {
        cls +='text-icon'
    }
    return cls;
}

const ButtonIcon = ({
    children,
    className = 'h-36px text-icon',
    icon,
    style,
    tooltipContent,
    tooltipPlacement = 'bottom',
    triggerParent,
    zIndex = 98,
    ...rest
}: Props) => {
    const cls = computeClass(className as string);
    function getPopupContainer(triggerNode: HTMLElement) {
        return triggerParent ? triggerNode.parentElement! : document.body;
    }
    return (
        <ATooltip
            getPopupContainer={getPopupContainer}
            placement={tooltipPlacement}
            title={tooltipContent}
            zIndex={zIndex}
            >
            <AButton
                className={cls}
                type="text"
                {...rest}
            >
                <div className="flex-center gap-8px">
                    { children || (
                        <SvgIcon
                            icon={icon}
                            style={style}
                            />
                    )}
                </div>
            </AButton>
        </ATooltip>
    )
}

export default ButtonIcon;