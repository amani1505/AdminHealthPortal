
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { AttributeValueMap, GroupedAttributes, PlayerType } from '@/types/player-types';
import { AUTH_ENDPOINTS } from '@/config/api';


interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  player_type_id: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship_id: string;
  specialization_id?: string;
  sub_specialization_id?: string;
  [key: string]: string | undefined;
}

export const useRegistrationFormState = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formValues, setFormValues] = useState<RegistrationFormValues>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    player_type_id: '',
    date_of_birth: '',
    phone_number: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship_id: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  }, []);

  // Update form values programmatically
  const updateFormValues = useCallback((updates: Partial<RegistrationFormValues>) => {
    setFormValues(prev => ({ ...prev, ...updates }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (
    e: React.FormEvent,
    attributeValues: AttributeValueMap,
    selectedCategory: string,
    selectedParentType: PlayerType | null,
    selectedChildType: PlayerType | null,
    selectedSpecialization: any | null,
    groupedAttributes: GroupedAttributes
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    try {
      // Prepare attributes data with group names as keys and attribute names as sub-keys
      const groupedAttributesData: Record<string, any> = {};
      
      // Create a mapping of attribute IDs to their names and groups
      const attributeIdMap: Record<string | number, { name: string, group: string }> = {};
      Object.entries(groupedAttributes).forEach(([groupName, attributes]) => {
        attributes.forEach(attr => {
          attributeIdMap[attr.id] = {
            name: attr.name,
            group: groupName
          };
        });
      });
      
      // Organize attribute values by group, using attribute names as keys
      Object.entries(attributeValues).forEach(([attrId, value]) => {
        const attributeInfo = attributeIdMap[attrId];
        if (attributeInfo) {
          const { name, group } = attributeInfo;
          if (!groupedAttributesData[group]) {
            groupedAttributesData[group] = {};
          }
          groupedAttributesData[group][name] = value;
        }
      });

      // Create registration payload
      const registrationData: Record<string, any> = {
        ...formValues,
        // Selected category becomes the primary player_type
        player_type: selectedCategory,
        // Parent type becomes player_type_id
        player_type_id: selectedParentType?.id || '',
        // Child type becomes specialization_id
        specialization_id: selectedChildType?.id || '',
        // Previous specialization becomes sub_specialization_id
        sub_specialization_id: selectedSpecialization?.id || '',
        metadata: groupedAttributesData
      };

      // Only include date_of_birth if it has a value
      if (!formValues.date_of_birth) {
        delete registrationData.date_of_birth;
      }

      console.log("Submitting registration data:", registrationData);

      // Send registration request using centralized endpoint
      await axios.post(AUTH_ENDPOINTS.REGISTER, registrationData);

      // Show success message
      toast.success('Registration successful! Please log in.');
      
      // Navigate to login page
      navigate('/login');
    } catch (error: any) {
      console.error('Registration failed:', error);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
        
        // Show validation errors
        const errorMessages = Object.values(error.response.data.errors).flat();
        errorMessages.forEach((message: any) => toast.error(message));
      } else {
        // Show generic error
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [formValues, navigate]);

  return {
    formValues,
    formErrors,
    isLoading,
    handleInputChange,
    updateFormValues,
    handleSubmit
  };
};
