import { JTDSchemaType, SomeJTDSchemaType } from "ajv/dist/jtd";

export type ValueOf<T> = T[keyof T];

export type { SomeJTDSchemaType };

export interface Step<T> {
  pageTitle: string;
  pageDescription?: string;
  schema: JTDSchemaType<T> | SomeJTDSchemaType;
  previous: string | null;
  next: string | null;
}
