import { request } from 'playwright';

const PETSTORE_URL = 'https://petstore.swagger.io/v2';

export class PetStoreClient {
  private context: any;

  constructor() {
    this.context = request.newContext();
  }

  async createUser(username: string, firstName: string, lastName: string) {
    const userPayload = {
      id: Math.floor(Math.random() * 10000), 
      username,
      firstName,
      lastName,
      email: `${username}@petstore.com`,
      password: 'petsore1',
      phone: '1234567890',
      userStatus: 1
    };

    const response = await (await this.context).post(`${PETSTORE_URL}/user`, { data: userPayload });
    return response.ok() ? userPayload : null;
  }

  async getUser(username: string) {
    const response = await (await this.context).get(`${PETSTORE_URL}/user/${username}`);
    return response.ok() ? await response.json() : null;
  }

  async getPetsByStatus(status: string = 'sold') {
    const response = await (await this.context).get(`${PETSTORE_URL}/pet/findByStatus?status=${status}`);
    return response.ok() ? await response.json() : [];
  }
}
