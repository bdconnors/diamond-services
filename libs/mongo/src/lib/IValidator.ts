import { ValidationResult } from "./ValidationResult";

export interface IValidator<T> {
  validate: (data:T) => ValidationResult 
}