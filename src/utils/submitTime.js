 // 定义格式化封装函数
 export function formaDate(timer) {
    const year = timer.getFullYear()
    const month = timer.getMonth() + 1 // 由于月份从0开始，因此需加1
    const day = timer.getDate()
    return `${pad(year, 4)}-${pad(month)}-${pad(day)}`
}

export function formaTime(timers) {
    const hour = timers.getHours()
    const minute = timers.getMinutes()
    const second = timers.getSeconds()
    return `${pad(hour)}:${pad(minute)}:${pad(second)}`
}

function pad(timeEl, total = 2, str = '0') {
    return timeEl.toString().padStart(total, str)
}
