export const bypass =
    <I>(fn: (i: I) => void) =>
    (input: I) => {
        fn(input)
        return input
    }

export const spread =
    <I extends unknown[], O>(fn: (...args: I) => O) =>
    (args: I) =>
    fn(...args)

export const assert =
    <T>() =>
    (i: any) =>
    i as T

export const repeat =
    <I>(n: number, f: (_input: I) => I) =>
    (input: I) => {
        let result = input
        for (let i=0;i<n;i++) {
            result = f(result)
        }
        return result
    }