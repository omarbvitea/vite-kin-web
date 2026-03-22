type Primitive = string | number | boolean | Date

const stringify = (value: Primitive): string => {
    if (value instanceof Date) {
        return value.toISOString()
    }
    return String(value)
}

export const removeNullishValues = <T extends object>(obj: T): Partial<T> => {
    if (!obj || typeof obj !== 'object') {
        return {} as Partial<T>
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined) {
            acc[key as keyof T] = value as T[keyof T]
        }
        return acc
    }, {} as Partial<T>)
}

export const convertToSearchParams = <
    T extends Record<string, Primitive | Primitive[] | undefined | null>,
>(
    params: T,
): URLSearchParams => {
    const searchParams = new URLSearchParams()

    const cleaned = removeNullishValues(params)

    Object.entries(cleaned).forEach(([key, val]) => {
        const value = val as Primitive | Primitive[]

        if (Array.isArray(value)) {
            if (value.length === 0) return

            value
                .filter((v) => v !== null && v !== undefined)
                .forEach((item) => {
                    searchParams.append(key, stringify(item))
                })
        } else {
            searchParams.append(key, stringify(value))
        }
    })

    return searchParams
}
