import type {WatermarkProps} from "antd";
import type {PropsWithChildren} from "react";
import {info} from "@/constants/app.ts";
import {antdLocales} from "@/locales/antd.ts";
import {ConfigProvider, Watermark} from "antd";

import {useLang} from "@/features/lang";

const WATERMARK_CONFIG = {
    font: {
        fontSize: 16,
    },
    height: 128,
    offset: [12, 60],
    rotate: -15,
    width: 240,
    zIndex: 9999,
} satisfies WatermarkProps;

function AntdConfig({children}: PropsWithChildren) {
    const {lang} = useLang()
    console.log(info)
    return (
        <ConfigProvider
            button={{classNames: {icon: 'align-1px text-icon'}}}
            card={{ styles: {body: {flex: 1, overflow: 'hidden', padding: '12px 16px'}}}}
            locale={antdLocales[lang]}
        >
            <Watermark
                className="h-full"
                content={'Soybean'}
                {...WATERMARK_CONFIG}
            >
                {children}
            </Watermark>
        </ConfigProvider>
    )
}

export default AntdConfig