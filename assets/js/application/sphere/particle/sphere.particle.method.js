SPHERE.particle.method = {
    setPointsPosition(param){
        const position = [], data = []
        for(let i = 0; i < param.count; i++){
            const {x, y, z, phi, theta} = this.getPointRandomPosition(param.radius)
            
            position[i * 3] = x
            position[i * 3 + 1] = y
            position[i * 3 + 2] = z

            data[i] = {
                position: {phi: phi, theta: theta}, 
                velocity: {
                    // phi: Math.random() * param.velocity - param.velocity / 2, 
                    // theta: Math.random() * param.velocity - param.velocity / 2
                    phi: Math.random() > 0.5 ? Math.random() * (-param.velocity / 2) - (param.velocity / 2) : Math.random() * (param.velocity / 2) + (param.velocity / 2), 
                    theta: Math.random() > 0.5 ? Math.random() * (-param.velocity / 2) - (param.velocity / 2) : Math.random() * (param.velocity / 2) + (param.velocity / 2)
                },
                connection: 0
            }
        }
        return {position: new Float32Array(position), data: data}
    },
    getPointRandomPosition(radius){
        const phi = Math.random() * 180
        const theta = Math.random() * 360
        // const phi = Math.random() > 0.5 ? 0 : 180
        // const theta = Math.random() * 180
        const {x, y, z} = METHOD.getSpherePosition(phi, theta, radius)
        return {x, y, z, phi, theta}
    }
}