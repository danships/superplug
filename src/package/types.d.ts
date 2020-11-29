
export type Package = {
    name: string,
    dependencies?: {[key: string]: string},
    [key: string]: any,
}
