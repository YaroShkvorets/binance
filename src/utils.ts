

export function timeout( ms: number ): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), ms ))
}

export function getTime( ) {
    const d = new Date();
    return `${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}.${("00" + d.getMilliseconds()).slice(-3)}`;
}

