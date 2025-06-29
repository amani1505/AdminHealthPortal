
import React, { useEffect } from 'react';
import { PlayerTypeAttribute } from '../../types/player-types';
import DynamicAttributeField from './DynamicAttributeField';
import { Separator } from '@/components/ui/separator';


interface DynamicAttributesFormProps {
  isLoadingAttributes: boolean;
  groupedAttributes: Record<string, PlayerTypeAttribute[]>;
  attributeValues: Record<string, any>;
  handleAttributeValueChange: (attributeId: string | number, value: any) => void;
  parseOptions: (options: string | null | undefined) => string[];
}

const DynamicAttributesForm: React.FC<DynamicAttributesFormProps> = ({
  isLoadingAttributes,
  groupedAttributes,
  attributeValues,
  handleAttributeValueChange,
  parseOptions
}) => {
  // Debug logging for props received
  useEffect(() => {
    console.log('DynamicAttributesForm: Received props', {
      isLoadingAttributes,
      groupsCount: groupedAttributes ? Object.keys(groupedAttributes).length : 0,
      groupNames: groupedAttributes ? Object.keys(groupedAttributes).join(', ') : 'none'
    });
  }, [isLoadingAttributes, groupedAttributes]);
  
  if (isLoadingAttributes) {
    return (
      <div className="space-y-4 text-center py-4">
        <p>Loading additional fields...</p>
      </div>
    );
  }

  if (!groupedAttributes || Object.keys(groupedAttributes).length === 0) {
    console.log('No attributes to display in DynamicAttributesForm');
    return null;
  }

  // Group keys that actually have attributes
  const groupsWithAttributes = Object.entries(groupedAttributes)
    .filter(([_, attrs]) => attrs && Array.isArray(attrs) && attrs.length > 0);

  if (groupsWithAttributes.length === 0) {
    console.log('No groups with attributes to display');
    return null;
  }

  return (
    <div className="space-y-6 border-t pt-4 mt-4">
      <h3 className="font-medium">Additional Information</h3>
      
      {groupsWithAttributes.map(([groupName, groupAttrs]) => (
        <div key={groupName} className="space-y-4">
          <div className="flex items-center space-x-2">
            <h4 className="font-medium text-sm">{groupName}</h4>
            <Separator className="flex-1" />
          </div>
          
          {groupAttrs.map(attribute => (
            <DynamicAttributeField
              key={attribute.id}
              attribute={attribute}
              value={attributeValues[attribute.id] || ''}
              onChange={handleAttributeValueChange}
              parseOptions={parseOptions}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DynamicAttributesForm;
