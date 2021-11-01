import { SomeJTDSchemaType, FieldProperties } from '@guyathomas/nf-common/lib/types';
import { SchemaType } from '@guyathomas/nf-common/lib/types/flows/common';
import sortBy from 'lodash/sortBy';

export interface FieldProps {
  name: string;
  properties: FieldProperties;
}

const makeFieldProperties = (schemaProperties = {}): FieldProps[] =>
  Object.entries(schemaProperties).map(([name, properties]: [string, FieldProps['properties']]) => ({
    name,
    properties,
  }));

const transformJTDSchema = (schema?: SomeJTDSchemaType): FieldProps[] => {
  if (!schema) return [];
  if ('properties' in schema || 'optionalProperties' in schema) {
    return sortBy(
      [...makeFieldProperties(schema.properties), ...makeFieldProperties(schema.additionalProperties)],
      'properties.metadata.order',
    );
  }
  return [];
};

export const schemaToFieldPropsMap: Record<SchemaType, (schema: any) => FieldProps[]> = {
  JTD: transformJTDSchema,
};
