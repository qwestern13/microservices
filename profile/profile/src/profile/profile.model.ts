import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ProfileCreationAttrs {
    firstname: string;
    secondname: string;
    phone: number;
    userid: number;

}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @Column({type: DataType.STRING, allowNull: false})
    firstname: string;

    @Column({type: DataType.STRING, allowNull: false})
    secondname: string;

    @Column({type: DataType.INTEGER, allowNull: false, unique: true})
    phone: number;

    @Column({type: DataType.STRING, allowNull: false})
    email: string;
    
}