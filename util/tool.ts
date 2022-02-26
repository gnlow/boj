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