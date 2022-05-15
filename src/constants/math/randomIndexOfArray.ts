export function randomIndexOfArray(arr: any[]) {
    let randomItem = arr[Math.floor(Math.random() * arr.length)]
    return [ randomItem ]
}