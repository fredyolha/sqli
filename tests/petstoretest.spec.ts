import { PetStoreClient } from '../src/api-helpers/api-client';
import { PetNameAnalyzer } from '../src/api-helpers/pet-name-handler';
import { expect, test } from '@playwright/test';
test('This should search for pets', async ({ request }) => {
  const apiClient = new PetStoreClient();
  const username = `testinguser${Math.floor(Math.random() * 1000)}`;
  const user = await apiClient.createUser(username, 'PETFIRST', 'PETLAST');
  if (user) {
    console.log('USER CREATED;', user);
    // needs a timeout to allow the user to be created
    await new Promise(r => setTimeout(r, 9000));
    const userData = await apiClient.getUser(username);
    console.log('USER DATA; ', userData);
  } else {
    console.log('ERROR CREATING USER');
    return;
  }

  const pets = await apiClient.getPetsByStatus('sold');
  const petList = pets
    .filter(pet => pet.id && pet.name)
    .map(pet => ({ id: pet.id, name: pet.name }));

  console.log('ALL SOLD PETS:', petList);

  const petNameAnalyzer = new PetNameAnalyzer(petList);
  const petNameCounts = petNameAnalyzer.countPetNames();
  console.log('PETCOUNTS; ', petNameCounts);
});
