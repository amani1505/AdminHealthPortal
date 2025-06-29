
import { useEffect } from 'react';
import { usePlayerTypeSelection } from './use-player-type-selection';
import { useRegistrationFormState } from './use-registration-form-state';
import { usePlayerTypeAttributes } from './use-player-type-attributes';

export const useRegisterPatient = () => {
  // Get player type selection functionality
  const playerTypeSelection = usePlayerTypeSelection();
  
  // Get form state and submission functionality
  const formState = useRegistrationFormState();
  
  // Get attribute management functionality
  const {
    attributes: directAttributes,
    groupedAttributes: directGroupedAttributes,
    attributeValues,
    parseOptions,
    handleAttributeValueChange,
    loading: isLoadingAttributes,
  } = usePlayerTypeAttributes();

  // Initialize player types on component mount
  useEffect(() => {
    playerTypeSelection.initializePlayerTypes();
  }, []);

  // Update form values when player type selection changes
  useEffect(() => {
    const updates: Record<string, string> = {};
    
    if (playerTypeSelection.selectedParentType) {
      updates.player_type_id = String(playerTypeSelection.selectedParentType.id);
    }
    
    if (playerTypeSelection.selectedChildType) {
      updates.specialization_id = String(playerTypeSelection.selectedChildType.id);
    }
    
    if (playerTypeSelection.selectedSpecialization) {
      updates.sub_specialization_id = String(playerTypeSelection.selectedSpecialization.id);
    } else {
      updates.sub_specialization_id = '';
    }
    
    formState.updateFormValues(updates);
  }, [
    playerTypeSelection.selectedParentType,
    playerTypeSelection.selectedChildType,
    playerTypeSelection.selectedSpecialization
  ]);

  // Calculate which attributes to use
  const calculatedAttributes = playerTypeSelection.attributes && playerTypeSelection.attributes.length > 0 
    ? playerTypeSelection.attributes 
    : directAttributes;

  // Calculate which grouped attributes to use
  const calculatedGroupedAttributes = Object.keys(playerTypeSelection.groupedAttributes || {}).length > 0
    ? playerTypeSelection.groupedAttributes
    : directGroupedAttributes;

  // Debug logging
  useEffect(() => {
    console.log('useRegisterPatient: Attributes length', calculatedAttributes.length);
    console.log('useRegisterPatient: Grouped Attributes', calculatedGroupedAttributes);
    console.log('useRegisterPatient: Groups count', Object.keys(calculatedGroupedAttributes || {}).length);
    console.log('useRegisterPatient: Attributes from playerTypeSelection', 
      playerTypeSelection.attributes ? playerTypeSelection.attributes.length : 0);
  }, [calculatedAttributes, calculatedGroupedAttributes, playerTypeSelection.attributes]);

  // Create submit handler that includes attribute values
  const handleSubmit = (e: React.FormEvent) => {
    formState.handleSubmit(
      e, 
      attributeValues, 
      playerTypeSelection.selectedCategory, 
      playerTypeSelection.selectedParentType, 
      playerTypeSelection.selectedChildType, 
      playerTypeSelection.selectedSpecialization,
      calculatedGroupedAttributes
    );
  };

  return {
    // Selection state from playerTypeSelection
    selectedCategory: playerTypeSelection.selectedCategory,
    selectedParentType: playerTypeSelection.selectedParentType,
    selectedChildType: playerTypeSelection.selectedChildType,
    selectedSpecialization: playerTypeSelection.selectedSpecialization,
    categories: playerTypeSelection.categories,
    categorizedPlayerTypes: playerTypeSelection.categorizedPlayerTypes,
    childTypes: playerTypeSelection.childTypes,
    specializations: playerTypeSelection.specializations,
    
    // Form state from formState
    formValues: formState.formValues,
    formErrors: formState.formErrors,
    
    // Attribute state
    attributeValues,
    
    // UI state
    isLoading: formState.isLoading,
    isLoadingCategories: playerTypeSelection.isLoadingCategories,
    isLoadingAttributes,
    
    // Computed values
    attributes: calculatedAttributes,
    groupedAttributes: calculatedGroupedAttributes,
    
    // Event handlers
    handleCategoryChange: playerTypeSelection.handleCategoryChange,
    handleParentTypeChange: playerTypeSelection.handleParentTypeChange,
    handleChildTypeChange: playerTypeSelection.handleChildTypeChange,
    handleSpecializationChange: playerTypeSelection.handleSpecializationChange,
    handleAttributeValueChange,
    handleInputChange: formState.handleInputChange,
    handleSubmit,
    
    // Utility functions
    parseOptions
  };
};
