import { JTDSchemaType, SomeJTDSchemaType } from "ajv/dist/jtd";

export type ValueOf<T> = T[keyof T];

export type { SomeJTDSchemaType };

export enum SchemaType {
  JTD = "JTD",
}

export interface Step<T> {
  pageTitle: string;
  pageDescription?: string;
  schema: JTDSchemaType<T> | SomeJTDSchemaType;
  previous: string | null;
  next: string | null;
  initialValues?: Partial<T>;
  schemaType: SchemaType;
}


export interface FieldProperties {
  type: FieldType;
  metadata: SchemaFieldMetadata;
}

export type CustomFieldName = "advancedSelectInput" | "selectableRowGroup";
interface SchemaFieldMetadata {
  label?: string;
  order?: number;
  fieldProps?: Record<string, any>
  customField?: CustomFieldName
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
export type FieldType = NumberType | StringType | "boolean";