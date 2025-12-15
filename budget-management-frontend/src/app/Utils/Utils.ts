export class Utils {
    static isEmpty(value?: unknown[] | string | null) {
        if (value == null) {
            return true;
        } 

        if (typeof value === 'string') {
            return value.trim().length === 0;
        }

        return value?.length == 0;
    }


    static isNotEmpty(array?: unknown[] | string | null) {
        return !this.isEmpty(array);
    }
}