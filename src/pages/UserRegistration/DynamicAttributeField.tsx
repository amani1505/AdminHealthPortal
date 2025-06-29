import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlayerTypeAttribute } from '@/types/player-types';
import React from 'react';


interface DynamicAttributeFieldProps {
  attribute: PlayerTypeAttribute;
  value: any;
  onChange: (attributeId: string | number, value: any) => void;
  parseOptions: (options: string | string[] | null | undefined) => string[];
}

const DynamicAttributeField: React.FC<DynamicAttributeFieldProps> = ({
  attribute,
  value,
  onChange,
  parseOptions
}) => {
  const handleChange = (newValue: any) => {
    onChange(attribute.id, newValue);
  };

  const renderField = () => {
    switch (attribute.type.toLowerCase()) {
      case 'text':
      case 'string':
        return (
          <Input
            id={`attr-${attribute.id}`}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Enter ${attribute.name.toLowerCase()}`}
            required={attribute.is_required}
          />
        );

      case 'textarea':
        return (
          <Textarea
            id={`attr-${attribute.id}`}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Enter ${attribute.name.toLowerCase()}`}
            required={attribute.is_required}
            className="min-h-[100px]"
          />
        );

      case 'number':
        return (
          <Input
            id={`attr-${attribute.id}`}
            type="number"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value ? parseFloat(e.target.value) : '')}
            placeholder={`Enter ${attribute.name.toLowerCase()}`}
            required={attribute.is_required}
          />
        );

      case 'email':
        return (
          <Input
            id={`attr-${attribute.id}`}
            type="email"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Enter ${attribute.name.toLowerCase()}`}
            required={attribute.is_required}
          />
        );

      case 'select':
      case 'dropdown': {
        const options = parseOptions(attribute.options);
        if (options.length === 0) {
          return (
            <Input
              id={`attr-${attribute.id}`}
              value={value || ''}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={`Enter ${attribute.name.toLowerCase()}`}
              required={attribute.is_required}
            />
          );
        }

        return (
          <Select
            value={value || ''}
            onValueChange={handleChange}
            required={attribute.is_required}
          >
            <SelectTrigger id={`attr-${attribute.id}`}>
              <SelectValue placeholder={`Select ${attribute.name.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              id={`attr-${attribute.id}`}
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => handleChange(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor={`attr-${attribute.id}`} className="text-sm">
              {attribute.name}
            </Label>
          </div>
        );

      case 'radio': {
        const options = parseOptions(attribute.options);
        return (
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  id={`attr-${attribute.id}-${index}`}
                  type="radio"
                  name={`attr-${attribute.id}`}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleChange(e.target.value)}
                  className="border-gray-300"
                />
                <Label htmlFor={`attr-${attribute.id}-${index}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      }

      case 'date':
        return (
          <Input
            id={`attr-${attribute.id}`}
            type="date"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            required={attribute.is_required}
          />
        );

      default:
        return (
          <Input
            id={`attr-${attribute.id}`}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Enter ${attribute.name.toLowerCase()}`}
            required={attribute.is_required}
          />
        );
    }
  };

  // For checkbox type, we don't want to render the label separately
  if (attribute.type.toLowerCase() === 'checkbox') {
    return (
      <div className="space-y-2">
        {renderField()}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`attr-${attribute.id}`}>
        {attribute.name}
        {attribute.is_required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
    </div>
  );
};

export default DynamicAttributeField;
