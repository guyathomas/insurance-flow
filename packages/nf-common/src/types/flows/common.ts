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


export interface FieldProperties {
  type: FieldType;
  metadata: SchemaFieldMetadata;
}

interface SchemaFieldMetadata {
  label: string;
  order?: number;
}

// These types are unfortunately not exported by JTD
type NumberType =
  | "float32"
  | "float64"
  | "int8"
  | "uint8"
  | "int16"
  | "uint16"
  | "int32"
  | "uint32";
type StringType = "string" | "timestamp";
export type FieldType = NumberType | StringType;