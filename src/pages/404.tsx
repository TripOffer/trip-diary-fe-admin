import React, {FC} from "react"
import {Button, Typography} from "antd"
import {useNavigate} from "react-router-dom"
import NotFound from "@/assets/404.svg"
import {$t} from "@/locales";

const {Title, Paragraph} = Typography

const NotFoundPage: FC = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 px-4 py-12">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02] duration-300">
                <div className="relative">
                    <img
                        src={NotFound}
                        alt="404 Not Found"
                        className="mx-auto block w-72 md:w-96 animate-pulse-slow"
                    />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent bottom-0 h-16"></div>
                </div>
            </div>

            <Title
                level={1}
                className="mt-5 mb-6 text-gray-600 text-center text-lg leading-relaxed"
            >
                {$t('common.title404')}
            </Title>
            <Paragraph
                className="mt-5 mb-6 text-gray-600 text-center text-lg leading-relaxed"
            >
                {$t('common.hint404')}
            </Paragraph>

            <div className="flex justify-center space-x-4">
                <Button
                    type="primary"
                    onClick={() => navigate('/')}
                    className="rounded-full px-8 py-3 h-auto font-medium text-base shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-700 border-none"
                >
                    {$t('common.backToHome')}
                </Button>
                <Button
                    onClick={() => navigate(-1)}
                    size="large"
                    className="rounded-full px-8 py-3 h-auto font-medium text-base border-2 border-gray-300 shadow-sm hover:border-blue-400 hover:text-blue-500 transition-all duration-300"
                >
                    {$t('common.back')}
                </Button>
            </div>
        </div>
    )
}

export default NotFoundPage