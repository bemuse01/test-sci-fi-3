const METHOD = {
    normalize(x, a, b, max, min){
        return (b - a) * (x - min) / (max - min) + a 
    },
    shuffle(arr){
        const temp = [...arr]
        for (let i = temp.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1))
            const t = temp[i]
            temp[i] = temp[j]
            temp[j] = t
        }
        return temp
    },
    getSpherePosition(p, t, radius){
        const phi = p * RADIAN
        const theta = t * RADIAN
        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.cos(phi)
        const z = radius * Math.sin(phi) * Math.sin(theta)
        return {x, y, z}
    }
}