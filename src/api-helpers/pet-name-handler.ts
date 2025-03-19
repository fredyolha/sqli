export class PetNameAnalyzer {
    private petData: { id: number, name: string }[];
  
    constructor(petData: { id: number, name: string }[]) {
      this.petData = petData;
    }
  
    countPetNames(): Record<string, number> {
      const nameCount: Record<string, number> = {};
  
      this.petData.forEach(pet => {
        if (pet.name) {
          nameCount[pet.name] = (nameCount[pet.name] || 0) + 1;
        }
      });
  
      return nameCount;
    }
  }
  