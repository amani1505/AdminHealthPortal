
import React from 'react';
import { PlayerType, PlayerTypeSpecialization } from '@/types/player-types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';




interface PlayerTypeSelectionProps {
  isLoadingCategories: boolean;
  categories: string[];
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
  categorizedPlayerTypes: Record<string, PlayerType[]>;
  selectedParentType: PlayerType | null;
  handleParentTypeChange: (parentTypeId: string) => void;
  childTypes: PlayerType[];
  selectedChildType: PlayerType | null;
  handleChildTypeChange: (childTypeId: string) => void;
  specializations: PlayerTypeSpecialization[];
  selectedSpecialization: PlayerTypeSpecialization | null;
  handleSpecializationChange: (specializationId: string) => void;
}

const PlayerTypeSelection: React.FC<PlayerTypeSelectionProps> = ({
  isLoadingCategories,
  categories,
  selectedCategory,
  handleCategoryChange,
  categorizedPlayerTypes,
  selectedParentType,
  handleParentTypeChange,
  childTypes,
  selectedChildType,
  handleChildTypeChange,
  specializations,
  selectedSpecialization,
  handleSpecializationChange
}) => {
  return (
    <>
      {/* Category Selection */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={selectedCategory || "select-category"}
          onValueChange={handleCategoryChange}
          disabled={isLoadingCategories}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map(category => (
                <SelectItem key={category} value={category || `category-${category}`}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      {/* Parent Type Selection */}
      {selectedCategory && categorizedPlayerTypes[selectedCategory]?.length > 1 && (
        <div className="space-y-2">
          <Label htmlFor="parent_type">Primary Role</Label>
          <Select
            value={selectedParentType ? String(selectedParentType.id) : "select-role"}
            onValueChange={handleParentTypeChange}
          >
            <SelectTrigger id="parent_type">
              <SelectValue placeholder="Select primary role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categorizedPlayerTypes[selectedCategory].map(parentType => (
                  <SelectItem key={parentType.id} value={String(parentType.id) || `parent-${parentType.name}`}>
                    {parentType.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      
      {/* Child Type Selection */}
      {selectedParentType && childTypes.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="child_type">Specific Role</Label>
          <Select
            value={selectedChildType ? String(selectedChildType.id) : "select-specific"}
            onValueChange={handleChildTypeChange}
          >
            <SelectTrigger id="child_type">
              <SelectValue placeholder="Select specific role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {childTypes.map(childType => (
                  <SelectItem key={childType.id} value={String(childType.id) || `child-${childType.name}`}>
                    {childType.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      
      {/* Specialization Selection */}
      {selectedChildType && specializations.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Select
            value={selectedSpecialization ? String(selectedSpecialization.id) : "none"}
            onValueChange={handleSpecializationChange}
          >
            <SelectTrigger id="specialization">
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">No specialization</SelectItem>
                {specializations.map(spec => (
                  <SelectItem key={spec.id} value={String(spec.id) || `spec-${spec.name}`}>
                    {spec.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default PlayerTypeSelection;
