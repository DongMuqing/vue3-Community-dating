export function formatTime(inputTime) {
    const currentTime = new Date();
    const inputDate = new Date(inputTime);
  
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  
    if (inputDate.getFullYear() === currentTime.getFullYear()) {
      if (
        inputDate.getMonth() === currentTime.getMonth() &&
        inputDate.getDate() === currentTime.getDate()
      ) {
        return inputDate.toLocaleTimeString([], options);
      } else if (
        inputDate.getMonth() === currentTime.getMonth() &&
        inputDate.getDate() === currentTime.getDate() - 1
      ) {
        return '昨天 ' + inputDate.toLocaleTimeString([], options);
      } else {
        return `${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate
          .getDate()
          .toString()
          .padStart(2, '0')} ${inputDate.toLocaleTimeString([], options)}`;
      }
    } else {
      return inputTime;
    }
  }
  
