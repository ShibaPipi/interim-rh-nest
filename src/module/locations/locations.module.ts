import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Location } from './locations.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Location])]
})
export class LocationsModule {}
