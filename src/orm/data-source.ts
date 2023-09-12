import { DataSource, DataSourceOptions } from 'typeorm'
import { CreateUserTable1693927247393 } from './migration/1693927247393-CreateUserTable'
import { CreateClientTable1693974393306 } from './migration/1693974393306-CreateClientTable'
import { CreateInterimTable1693978057736 } from './migration/1693978057736-CreateInterimTable'
import { CreateInterimAvailPoolTable1693984469625 } from './migration/1693984469625-CreateInterimAvailPoolTable'
import { CreateLocationUserTable1693984654985 } from './migration/1693984654985-CreateLocationUserTable'
import { CreateLocationTable1693985553754 } from './migration/1693985553754-CreateLocationTable'
import { CreatePlanDateTable1693985854332 } from './migration/1693985854332-CreatePlanDateTable'
import { CreatePresenceDateTable1693986156904 } from './migration/1693986156904-CreatePresenceDateTable'
import { CreateScheduleTable1693986489674 } from './migration/1693986489674-CreateScheduleTable'

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: +(process.env.DATABASE_PORT || 3306),
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_DATABASE || 'interim_rh_nest',
    migrations: [
        CreateClientTable1693974393306,
        CreateUserTable1693927247393,
        CreateInterimTable1693978057736,
        CreateInterimAvailPoolTable1693984469625,
        CreateLocationUserTable1693984654985,
        CreateLocationTable1693985553754,
        CreatePlanDateTable1693985854332,
        CreatePresenceDateTable1693986156904,
        CreateScheduleTable1693986489674
    ]
}

export const AppDataSource = new DataSource(dataSourceOptions)
