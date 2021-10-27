import { SomeJTDSchemaType, FieldProperties } from '@guyathomas/nf-common/lib/types';
import sortBy from 'lodash/sortBy';

interface FieldProps {
  name: string;
  properties: FieldProperties;
}

const makeFieldProperties = (schemaProperties = {}): FieldProps[] =>
  Object.entries(schemaProperties).map(([name, properties]: [string, FieldProps['properties']]) => ({
    name,
    properties,
  }));

export const transformJTDSchema = (schema?: SomeJTDSchemaType): FieldProps[] => {
  if (!schema) return [];
  if ('properties' in schema || 'optionalProperties' in schema) {
    return sortBy(
      [...makeFieldProperties(schema.properties), ...makeFieldProperties(schema.additionalProperties)],
      'properties.metadata.order',
    );
  }
  return [];
};
