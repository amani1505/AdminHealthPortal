
import { PlayerType, PlayerTypeSpecialization } from '@/types/player-types';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { usePlayerTypeAttributes } from './use-player-type-attributes';
import { PlayerTypesAPI } from '@/services/player-types-api';

export const usePlayerTypeSelection = () => {
  // State for categories and player types
  const [categories, setCategories] = useState<string[]>([]);
  const [playerTypes, setPlayerTypes] = useState<PlayerType[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  
  // Selected state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedParentType, setSelectedParentType] = useState<PlayerType | null>(null);
  const [selectedChildType, setSelectedChildType] = useState<PlayerType | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<PlayerTypeSpecialization | null>(null);
  
  // Child types and specializations
  const [childTypes, setChildTypes] = useState<PlayerType[]>([]);
  const [specializations, setSpecializations] = useState<PlayerTypeSpecialization[]>([]);
  
  // Use the attributes hook
  const {
    attributes,
    groupedAttributes,
    fetchPlayerTypeAttributes,
    setAttributes: setAttributesDirectly
  } = usePlayerTypeAttributes();

  // Categorize player types
  const categorizedPlayerTypes = useMemo(() => {
    const categorized: Record<string, PlayerType[]> = {};
    
    playerTypes.forEach(type => {
      const category = type.category || 'Other';
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(type);
    });
    
    return categorized;
  }, [playerTypes]);

  // Initialize categories and player types
  const initializePlayerTypes = useCallback(async () => {
    setIsLoadingCategories(true);
    try {
      console.log('Fetching categories and player types...');
      
      // Fetch categories and player types in parallel
      const [categoriesData, playerTypesData] = await Promise.all([
        PlayerTypesAPI.fetchCategories(),
        PlayerTypesAPI.fetchPlayerTypes()
      ]);
      
      console.log('Categories fetched:', categoriesData.length);
      console.log('Player types fetched:', playerTypesData.length);
      
      setCategories(categoriesData);
      setPlayerTypes(playerTypesData);
    } catch (error) {
      console.error('Error initializing player types:', error);
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback(async (category: string) => {
    if (category === 'select-category') return;
    
    console.log('Category selected:', category);
    setSelectedCategory(category);
    
    // Reset downstream selections
    setSelectedParentType(null);
    setSelectedChildType(null);
    setSelectedSpecialization(null);
    setChildTypes([]);
    setSpecializations([]);
    
    // If there's only one player type in this category, auto-select it
    const typesInCategory = categorizedPlayerTypes[category] || [];
    if (typesInCategory.length === 1) {
      const singleType = typesInCategory[0];
      console.log('Auto-selecting single player type:', singleType.name);
      setSelectedParentType(singleType);
      
      // Fetch children and attributes for the auto-selected type
      try {
        const [childrenData] = await Promise.all([
          PlayerTypesAPI.fetchChildren(singleType.id),
        ]);
        
        setChildTypes(childrenData);
        
        // If the player type has attributes, fetch them
        if (singleType.attributes && singleType.attributes.length > 0) {
          console.log('Using pre-loaded attributes from player type');
          setAttributesDirectly(singleType.attributes);
        } else {
          console.log('Fetching attributes for player type:', singleType.id);
          await fetchPlayerTypeAttributes(singleType.id);
        }
      } catch (error) {
        console.error('Error fetching data for auto-selected player type:', error);
      }
    }
  }, [categorizedPlayerTypes, fetchPlayerTypeAttributes, setAttributesDirectly]);

  // Handle parent type change
  const handleParentTypeChange = useCallback(async (parentTypeId: string) => {
    if (parentTypeId === 'select-role') return;
    
    const parentType = playerTypes.find(type => String(type.id) === parentTypeId);
    if (!parentType) return;
    
    console.log('Parent type selected:', parentType.name);
    setSelectedParentType(parentType);
    
    // Reset child selections
    setSelectedChildType(null);
    setSelectedSpecialization(null);
    setSpecializations([]);
    
    try {
      // Fetch children for the parent type
      const childrenData = await PlayerTypesAPI.fetchChildren(parentType.id);
      console.log('Children fetched:', childrenData.length);
      setChildTypes(childrenData);
      
      // Fetch attributes for the parent type
      if (parentType.attributes && parentType.attributes.length > 0) {
        console.log('Using pre-loaded attributes from parent type');
        setAttributesDirectly(parentType.attributes);
      } else {
        console.log('Fetching attributes for parent type:', parentType.id);
        await fetchPlayerTypeAttributes(parentType.id);
      }
    } catch (error) {
      console.error('Error fetching children and attributes:', error);
    }
  }, [playerTypes, fetchPlayerTypeAttributes, setAttributesDirectly]);

  // Handle child type change
  const handleChildTypeChange = useCallback(async (childTypeId: string) => {
    if (childTypeId === 'select-specific') return;
    
    const childType = childTypes.find(type => String(type.id) === childTypeId);
    if (!childType) return;
    
    console.log('Child type selected:', childType.name);
    setSelectedChildType(childType);
    
    // Reset specialization
    setSelectedSpecialization(null);
    
    try {
      // Fetch specializations for the child type
      const specializationsData = await PlayerTypesAPI.fetchSpecializations(childType.id);
      console.log('Specializations fetched:', specializationsData.length);
      setSpecializations(specializationsData);
      
      // Fetch attributes for the child type (these will override parent attributes)
      if (childType.attributes && childType.attributes.length > 0) {
        console.log('Using pre-loaded attributes from child type');
        setAttributesDirectly(childType.attributes);
      } else {
        console.log('Fetching attributes for child type:', childType.id);
        await fetchPlayerTypeAttributes(childType.id);
      }
    } catch (error) {
      console.error('Error fetching specializations and attributes:', error);
    }
  }, [childTypes, fetchPlayerTypeAttributes, setAttributesDirectly]);

  // Handle specialization change
  const handleSpecializationChange = useCallback((specializationId: string) => {
    if (specializationId === 'none') {
      setSelectedSpecialization(null);
      return;
    }
    
    const specialization = specializations.find(spec => String(spec.id) === specializationId);
    if (specialization) {
      console.log('Specialization selected:', specialization.name);
      setSelectedSpecialization(specialization);
    }
  }, [specializations]);

  return {
    // State
    categories,
    categorizedPlayerTypes,
    selectedCategory,
    selectedParentType,
    selectedChildType,
    selectedSpecialization,
    childTypes,
    specializations,
    
    // Loading state
    isLoadingCategories,
    
    // Attributes (from the attributes hook)
    attributes,
    groupedAttributes,
    
    // Actions
    initializePlayerTypes,
    handleCategoryChange,
    handleParentTypeChange,
    handleChildTypeChange,
    handleSpecializationChange,
  };
};
