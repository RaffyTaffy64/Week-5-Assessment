import { DataTypes, Model } from 'sequelize'
import connectToDB from './db.js'
import util from 'util'


const db = await connectToDB('postgresql:///animals')

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }

  getFullName() {
    return `${this.fname} ${this.lname}`
  }
}

export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

Human.init({
  human_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Human',
  tableName: 'humans',
  timestamps: false,
})

Animal.init({
  animal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  human_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Human,
      key: 'human_id'
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth_year: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize: db,
  modelName: 'Animal',
  tableName: 'animals',
  timestamps: false,
})

Human.hasMany(Animal, { foreignKey: 'human_id' })
Animal.belongsTo(Human, { foreignKey: 'human_id' })

export default db

