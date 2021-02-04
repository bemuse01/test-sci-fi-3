SPHERE.particle.method = {
    setPointsPosition(attr, param){
        const position = [], data = []
        for(let i = 0; i < param.count; i++){
            const {x, y, z, phi, theta} = this.getPointRandomPosition(param.radius)
            
            position[i * 3] = x
            position[i * 3 + 1] = y
            position[i * 3 + 2] = z

            data[i] = {
                position: {phi: phi, theta: theta}, 
                velocity: {phi: Math.random() * param.velocity - param.velocity / 2, theta: Math.random() * param.velocity - param.velocity / 2},
                connection: 0
            }
        }
        return {position: new Float32Array(position), data: data}
    },
    getPointRandomPosition(radius){
        const phi = Math.random() * 180
        const theta = Math.random() * 360
        const {x, y, z} = this.getSpherePosition(phi, theta, radius)
        return {x, y, z, phi, theta}
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