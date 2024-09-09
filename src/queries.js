import { Op } from 'sequelize'
import { Animal, Human } from './model.js'


export const query1 = Human.findByPk(2)

export const query2 = Animal.findOne({
  where: { species: 'fish' }
})

export const query3 = Animal.findAll({
  where: { human_id: 5 }
})

export const query4 = Animal.findAll({
  where: {
    birth_year: {
      [Op.gt]: 2015
    }
  }
})

export const query5 = Human.findAll({
  where: {
    fname: {
      [Op.iLike]: 'J%'
    }
  }
})

export const query6 = Animal.findAll({
  where: {
    birth_year: null
  }
})

export const query7 = Animal.findAll({
  where: {
    species: {
      [Op.in]: ['fish', 'rabbit']
    }
  }
})

export const query8 = Human.findAll({
  where: {
    email: {
      [Op.notLike]: '%gmail%'
    }
  }
})

export async function printHumansAndAnimals() {
  const humans = await Human.findAll({
    include: Animal
  })

  humans.forEach(human => {
    console.log(`Human: ${human.getFullName()}`)
    human.animals.forEach(animal => {
      console.log(`  Animal: ${animal.name} (${animal.species})`)
    })
  })
}

export async function getHumansByAnimalSpecies(species) {
  const animals = await Animal.findAll({
    where: { species },
    include: [Human]
  })

  const humanNames = new Set(animals.map(animal => animal.Human.getFullName()))
  return humanNames
}
