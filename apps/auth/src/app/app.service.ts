import { Injectable } from '@nestjs/common';
import jwt, { Algorithm } from 'jsonwebtoken';
import axios from 'axios';
import fs from 'fs';

@Injectable()
export class AppService {

  async decode(token: string) {
    const key: string = process.env.SECRET;
    return jwt.verify(token, key);
  }
  
  async login(email: string, password: string) {
    try {
      const success = await this.validate(email, password);
      if(!success) { throw new Error('login failed');}
      const endpoint = `${process.env.USER_SERVICE_URL}/${email}`;
      const response = await axios.get(endpoint);
      const user = response.data;
      return this.sign(user);
    }catch(e){
      throw e;
    }
  }
  async validate(email: string, password: string):Promise<boolean> {
    try{
      const endpoint = `${process.env.USER_SERVICE_URL}/validate`;
      const body = { email: email, password: password };
      const response = await axios.post(endpoint, body);
      return response.data.success;
    }catch(e) {
      throw e;
    }
  }

  sign(data: object): string {
    const alg: Algorithm = process.env.ALG as Algorithm;
    const key: string = process.env.SECRET;
    return jwt.sign(data, key)
  }
}
