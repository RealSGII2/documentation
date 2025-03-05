export default class ToggleList<T> extends Array<T> {
    public static from<T>(array: T[]) {
        return new ToggleList<T>(...array);
    }

    public toggle(item: T) {
        if (this.includes(item)) this.splice(this.indexOf(item), 1);
        else this.push(item);
    }
}
