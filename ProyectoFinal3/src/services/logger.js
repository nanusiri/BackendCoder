import winston from "winston"
const { createLogger, format, transports } = winston

const customLevelOptions = {
    levelsDev: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "orange",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "white"
    }
}

//Logger DESARROLLO
export const devLogger = createLogger({
    levels: customLevelOptions.levelsDev,
    transports: [
        new transports.Console({
            level: "debug",
            format: format.combine(
                format.colorize({ colors: customLevelOptions.colors }),
                format.simple()
            )
        }),
        new transports.File({
            filename: "./errors.log",
            level: "error",
            format: format.simple()
        })
    ]
})

//Middleware
export const logger = (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        req.logger = prodLogger
    } else {
        req.logger = devLogger
    }
    next()
}
