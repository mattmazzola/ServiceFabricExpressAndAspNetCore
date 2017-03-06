export const promisify = <T>(f: Function) => {
    const maxArgs = f.length - 1

    return (...args: any[]) => {
        if (args.length > maxArgs)
            throw new Error(`Target function only accepts ${maxArgs} arguments. You passed ${args.length}`)

        return new Promise<T>((resolve: any, reject: any) => {
            f(...args, (error: any, value: T) => {
                if (error)
                    reject(error)

                resolve(value)
            });
        })
    }
}

// export const readFile = (filePath: string, options: any) =>
//     new Promise((resolve, reject) =>
//         )