import {useTokenStore} from "@/store/token.ts";
import {Icon} from "@iconify/react";

interface NavIconProps {
    icon: string
    iconText: string
    onClick: () => void
    className?: string
}

export default function NavIcon({icon, iconText, onClick, className = ''}: NavIconProps) {
    const { clearToken } = useTokenStore()
    return (
        <div className={`col-center flex-col cursor-pointer ${className}`} onClick={onClick}>
            <Icon icon={icon} width="24" height="24" />
            <p className='text-sm'>{iconText}</p>
        </div>
    )
}