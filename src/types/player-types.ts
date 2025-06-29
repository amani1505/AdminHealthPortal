// Define the PlayerType interface
export interface PlayerType {
  id: string | number;
  name: string;
  description?: string;
  parent_id: string | number | null;
  category?: string;
  icon?: string;
  is_active: boolean;
  metadata?: Record<string, unknown>;
  children?: PlayerType[];
  specializations?: PlayerTypeSpecialization[];
  attributes?: PlayerTypeAttribute[];
}

// Define the PlayerTypeSpecialization interface
export interface PlayerTypeSpecialization {
  id: string | number;
  player_type_id: string | number;
  name: string;
  description?: string;
  qualifications?: string[] | string;
  services?: string[] | string;
  is_active: boolean;
}

// Define the PlayerTypeAttribute interface
export interface PlayerTypeAttribute {
  id: string | number;
  player_type_id: string | number;
  name: string;
  type: string;
  is_required: boolean;
  options?: string | string[] | null;
  validation_rules?: string | string[] | null;
  display_group?: string;
  display_order?: number;
}

// Add additional types for form generation
export interface AttributeValueMap {
  [key: string]: string | string[] | boolean | number | null;
}

export interface GroupedAttributes {
  [group: string]: PlayerTypeAttribute[];
}

export type FormAttributeValue = string | string[] | boolean | number | null;

export interface PlayerTypeFormData {
  player_type_id: string | number;
  specialization_id?: string | number;
  attributes_data: AttributeValueMap;
}
