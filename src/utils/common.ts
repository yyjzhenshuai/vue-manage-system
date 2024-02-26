export function formatTimestamp(timestamp: any,format: string): any {
    if (!timestamp){
      return
    }
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    if (format === 'datetime') {
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } else if (format === 'date') {
      return `${year}-${month}-${day}`;
    } else {
      throw new Error('Invalid format');
    }
  }
  export function otherReusableFunction(): void {
    // 这里是另一个可复用的函数的实现
  }
  // 以金额方式显示数值
  export function formatNumberWithCommas(number:any) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }