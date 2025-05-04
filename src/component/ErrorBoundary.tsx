import {Button, Typography} from "antd";
import type {FallbackProps} from "react-error-boundary";

import {$t} from "@/locales";
import SvgIcon from "@/component/icon/SvgIcon.tsx";

const isDev = import.meta.env.DEV;
const {Text, Title} = Typography;
const theme = '#646cff';

const ErrorPage = ({error, resetErrorBoundary}: FallbackProps) => {
    return (
        <div className="size-full min-h-520px flex-col-center gap-16px overflow-hidden">
            <div className="flex text-400px text-primary">
                <SvgIcon localIcon="error" />
            </div>
            {isDev ? <Text code>{error.message}</Text> : <Title level={3}>{$t('common.errorHint')}</Title>}
            <Button
                style={{backgroundColor: theme}}
                type="primary"
                onClick={resetErrorBoundary}
            >
                {$t('common.tryAlign')}
            </Button>
        </div>
    )
}

export default ErrorPage;