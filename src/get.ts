export function get<T>(obj: any, path: string, defaultValue?: T): T | undefined {
    const index = path.split('.');
    let value: any = obj || {};

    let i = 0;
    for (; i < index.length; i ++) {
        value = value[index[i]];
        
        if (value === null || typeof value !== 'object') {
            break;
        }
    }

    return index.length - 1 === i ? (value as T) : defaultValue;
}