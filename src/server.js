import env from 'common-env'
import { Server } from 'hapi'
import Sequelize from 'sequelize'
import uuidv4 from 'uuid/v4'
import sha256 from 'sha256'
import moment from 'moment'

export default function start() {
    const config = env().getOrElseAll({
        hapi: {
            host: 'localhost',
            port: 4444
        },
        sqlite: {
            host: 'localhost',
            database: 'pyro',
            path: './../piro.db'
        }
    })

    const server = new Server({
        host: config.hapi.host,
        port: config.hapi.port,
        routes: { cors: { origin: ['*'] } }
    })

    const db = new Sequelize(config.sqlite.database, {
        host: config.sqlite.host,
        dialect: 'sqlite',
        storage: config.sqlite.path,
        operatorsAliases: false
    })

    const show = db.define('show', {
        show_id: {
            type: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        createdAt: Sequelize.NOW,
        updatedAt: Sequelize.DATE,
        password: Sequelize.STRING
    })

    const showStep = db.define('showStep', {
        showStep_id: {
            type: Sequelize.UUIDV4,
            primaryKey: true
        },
        show_id: {
            type: Sequelize.UUIDV4,
            references: {
                model: show,
                key: 'show_id'
            }
        },
        cueOrder: Sequelize.INTEGER,
        name: Sequelize.STRING,
        canal: Sequelize.INTEGER,
        createdAt: Sequelize.NOW,
        updatedAt: Sequelize.DATE,
        password: Sequelize.STRING
    })

    db.sync().then(() =>
        show.create({
            show_id: uuidv4(),
            name: 'YopYop',
            password: sha256('yopyopyop'),
            updatedAt: moment()
        })
    )

    return server
}
