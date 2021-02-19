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
    },
    getVisibleHeight(camera, depth){
        const cameraOffset = camera.position.z
        if(depth < cameraOffset) depth -= cameraOffset
        else depth += cameraOffset
        const vFov = camera.fov * RADIAN
        return 2 * Math.tan(vFov / 2) * Math.abs(depth)
    },
    getVisibleWidth(camera, depth){
        const height = this.getVisibleHeight(camera, depth)
        return height * camera.aspect
    },
    getDividedIndexArray(len, div){
        const index = [], arr = []
        for(let i = 0; i < len; i++) index[i] = i

        while(index.length !== 0){
            const temp = []
            for(let i = 0; i < div; i++){
                const rand = Math.floor(Math.random() * index.length)
                temp.push(index[rand])
                index.splice(rand, 1)
            }
            arr.push(temp)
        }

        return arr
    }
}