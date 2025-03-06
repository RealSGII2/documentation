export default class Path {
    public readonly path: string;
    
    public constructor(
        ...segments: string[]
    ) {
        this.path = segments.join('/');
    }

    public get normalized() {
        return this.path.trim().replace(/\\/g, '/');
    }

    public get segments() {
        return this.normalized.split('/');
    }

    public get first() {
        return this.segments[0];
    }
}