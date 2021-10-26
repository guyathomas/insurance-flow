import { JTDSchemaType, SomeJTDSchemaType } from 'ajv/dist/jtd';

export type SomeJTDSchemaTypeStep = Step<SomeJTDSchemaType>;
export interface Step<T> {
  pageTitle: string;
  pageDescription?: string;
  schema: JTDSchemaType<T>;
  previous: string | null;
  next: string | null;
}
