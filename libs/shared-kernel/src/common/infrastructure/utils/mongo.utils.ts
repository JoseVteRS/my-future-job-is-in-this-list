import type { FilterQuery } from 'mongoose';
import { CriteriaOperator } from '@shared-kernel/common/domain/enums/criteria-operators.enum';

/**
 * Joins a set of filters into a unique mongoose filter query with an operator
 * @param filters Array of filters
 * @param operator Operator to use
 * @returns Filter query
 */
export const mapMongoFilters = (
  filters: FilterQuery<any>[],
  operator?: CriteriaOperator
): FilterQuery<any> => {
  if (filters.length === 1) return filters[0];

  return operator === CriteriaOperator.OR
    ? { $or: filters }
    : { $and: filters };
};

/**
 * Transforms a string into a regex-based non diacritic sensitive string
 * @param text Original text
 * @returns Regex-based text
 */
export const diacriticSensitiveRegex = (text: string) =>
  escapeAllSpecialCharsRegex(text)
    .toLowerCase()
    .replace(/a/g, '[a,á,à,ä]')
    .replace(/e/g, '[e,é,ë]')
    .replace(/i/g, '[i,í,ï]')
    .replace(/o/g, '[o,ó,ö,ò]')
    .replace(/u/g, '[u,ü,ú,ù]');

/**
 * Transforms a phone string into a regex
 * @param phone Phone input
 * @returns Phone regex
 */
export const phoneRegex = (phone: string) =>
  phone.replace(/\s/g, '').split('').join('\\s*').replace(/\+/g, '\\+');

/**
 * Escapes all characters of a regex
 * @param value Plain text value
 * @returns Escaped value
 */
export const escapeAllSpecialCharsRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
