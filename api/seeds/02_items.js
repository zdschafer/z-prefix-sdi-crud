/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {name: "Vibranium Shield", description: "Captain America's shield is a fictional item appearing in American comic books published by Marvel Comics. It is the primary defensive and offensive piece of equipment used by Captain America, and is intended to be an emblem of American culture.", "quantity": 1, user_id: 1},
    {name: "Mjolnir", description: "Mjölnir is the hammer of the thunder god Thor in Norse mythology, used both as a devastating weapon and as a divine instrument to provide blessings. Cap has always been able to wield it.", "quantity": 1, user_id: 1},
    {name: "Captain America Uniforms", description: "Captain America's many uniforms seen in the MCU", "quantity": 9, user_id: 1},

    {name: "Dollars", description: "He's rich.", "quantity": 80000000000, user_id: 2},
    {name: "Iron Man Suits", description: "Iron Man's many suits seen in the MCU", "quantity": 52, user_id: 2},
    {name: "Box of scraps", description: "Used to build the Mark I Iron Man suit.", "quantity": 999, user_id: 2},

    {name: "Stormbreaker", description: "Stormbreaker is an enchanted axe of Dwarvian manufacture, forged from Uru on Nidavellir with the ability to summon the Bifrost.", "quantity": 1, user_id: 3},
    {name: "Mjolnir", description: "You will be missed.", "quantity": 0, user_id: 3},
    {name: "Brothers", description: "You will also be missed.", "quantity": 0, user_id: 3},

    {name: "IQ Points", description: "He's pretty smart.", "quantity": 180, user_id: 4},
    {name: "Angry green, monster", description: "Radiation baby", "quantity": 2, user_id: 4},
    {name: "Ability to use the elevator", description: "Take the stairs big guy!", "quantity": 0, user_id: 4},
  ]);
};
