// angular
import { Injectable } from '@angular/core';

@Injectable()
export class StateTransferService {
  private readonly state: Map<string, any>;

  constructor() {
    this.state = new Map<string, any>();
  }

  initialize(state: Map<string, any>): void {
    Object.keys(state)
      .forEach(key => {
        this.set(key, state[key]);
      });
  }

  get(key: string): any {
    return this.state.get(key);
  }

  set(key: string, value: any): Map<string, any> {
    return this.state.set(key, value);
  }

  inject(): void {
    // leave it to implementor
  }

  protected toJson(): any {
    const obj = {};
    Array.from(this.state.keys())
      .forEach((key: string) => {
        obj[key] = this.get(key);
      });

    return obj;
  }
}
