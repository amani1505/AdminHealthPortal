
import { useState, useCallback, useMemo, useEffect } from 'react';
import { AttributeValueMap, GroupedAttributes, PlayerTypeAttribute } from '@/types/player-types';
import { PlayerTypesAPI } from '@/services/player-types-api';

/**
 * Hook for managing player type attributes
 */
export const usePlayerTypeAttributes = () => {
  const [attributes, setAttributes] = useState<PlayerTypeAttribute[]>([]);
  const [attributeValues, setAttributeValues] = useState<AttributeValueMap>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse JSON string options to array
  const parseOptions = useCallback((optionsStr: string | null | undefined): string[] => {
    if (!optionsStr) return [];
    try {
      const parsed = JSON.parse(optionsStr);
      // Ensure each option has a non-empty value
      return Array.isArray(parsed) ? parsed.filter(opt => opt && opt !== '') : [];
    } catch (err) {
      console.error('Error parsing options:', err);
      return [];
    }
  }, []);

  // Group attributes by display_group
  const groupedAttributes = useMemo<GroupedAttributes>(() => {
    console.log('Grouping attributes:', attributes.length);
    const groups: GroupedAttributes = {};
    
    attributes.forEach(attr => {
      const group = attr.display_group || 'General';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(attr);
    });
    
    // Sort attributes within each group by display_order
    Object.keys(groups).forEach(group => {
      groups[group].sort((a, b) => {
        const orderA = a.display_order || 0;
        const orderB = b.display_order || 0;
        return orderA - orderB;
      });
    });
    
    console.log('Grouped attributes:', Object.keys(groups).length, 'groups');
    if (Object.keys(groups).length > 0) {
      console.log('Groups:', Object.keys(groups).join(', '));
    }
    return groups;
  }, [attributes]);

  // Log attributes updates
  useEffect(() => {
    console.log(`🔄 Attributes updated: ${attributes.length} attributes available`);
    if (attributes.length > 0) {
      console.log(`Sample attribute: ${JSON.stringify(attributes[0])}`);
    }
  }, [attributes]);

  // Handle attribute value changes
  const handleAttributeValueChange = useCallback((attributeId: string | number, value: string | string[] | boolean | number | null) => {
    console.log('Setting attribute value:', attributeId, value);
    setAttributeValues(prev => ({
      ...prev,
      [attributeId]: value
    }));
  }, []);

  // Reset attribute values
  const resetAttributeValues = useCallback(() => {
    console.log('Resetting attribute values');
    setAttributeValues({});
  }, []);

  // Explicitly set attributes (used when attributes are already available in player type data)
  const setAttributesDirectly = useCallback((newAttributes: PlayerTypeAttribute[]) => {
    console.log('Setting attributes directly:', newAttributes?.length || 0);
    if (Array.isArray(newAttributes) && newAttributes.length > 0) {
      setAttributes(newAttributes);
      console.log('Attributes set successfully:', newAttributes.length);
    } else {
      console.warn('Empty or invalid attributes array provided:', newAttributes);
      // Don't clear attributes if the new array is empty - this prevents wiping out valid attributes
      // when an empty array is passed due to failed fetch or other issues
    }
  }, []);

  // Fetch player type attributes
  const fetchPlayerTypeAttributes = useCallback(async (playerTypeId: string | number): Promise<PlayerTypeAttribute[]> => {
    if (!playerTypeId) {
      console.warn('No player type ID provided for attribute fetch');
      return [];
    }
    
    console.log(`🔍 Fetching attributes for player type ID: ${playerTypeId}`);
    setLoading(true);
    setError(null);
    
    try {
      const data = await PlayerTypesAPI.fetchAttributes(playerTypeId);
      console.log(`✅ Fetched ${data.length} attributes for player type ID ${playerTypeId}`);
      
      // Only update the state if we got attributes
      if (data && data.length > 0) {
        setAttributes(data);
      } else {
        console.warn(`No attributes found for player type ID ${playerTypeId}`);
      }
      
      setLoading(false);
      return data;
    } catch (err) {
      console.error(`❌ Error fetching attributes for player type ID ${playerTypeId}:`, err);
      setError(`Error fetching attributes for player type with ID ${playerTypeId}`);
      setLoading(false);
      return [];
    }
  }, []);

  return {
    attributes,
    groupedAttributes,
    attributeValues,
    loading,
    error,
    parseOptions,
    handleAttributeValueChange,
    resetAttributeValues,
    fetchPlayerTypeAttributes,
    setAttributes: setAttributesDirectly,
  };
};
