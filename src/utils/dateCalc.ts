export function dateCalc(dateTime: string): string {
    const inputDate = new Date(dateTime)
    const now = new Date()
    const locale = localStorage.getItem('lang') || 'zh-CN'
    const diffInMs = now.getTime() - inputDate.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    if(diffInDays < 1) {
        const hours = inputDate.getHours().toString().padStart(2, '0')
        const minutes = inputDate.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    } else if(diffInDays <= 6) {
        return locale === 'zh-CN'
            ? `${diffInDays}天前`
            : `${diffInDays} days ago`
    } else if(diffInDays <= 7) {
        return locale === 'zh-CN'
            ? `一周前`
            : `a week ago`
    } else {
        const year = inputDate.getFullYear()
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0')
        const day = inputDate.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${day}`
    }
}