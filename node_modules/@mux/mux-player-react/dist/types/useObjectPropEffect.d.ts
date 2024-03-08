export declare const defaultHasChanged: (obj: any, v: any, k: string) => boolean;
export declare const useObjectPropEffect: <T extends {
    [k: string]: any;
}, V>(propName: string, propValue: V | null | undefined, ref: import("react").MutableRefObject<T | null> | null | undefined, updateValue?: (obj: any, v: any, k: string) => void, hasChanged?: (obj: any, v: any, k: string) => boolean) => void;
export default useObjectPropEffect;
