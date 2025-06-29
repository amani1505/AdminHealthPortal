import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CrudTable, CrudColumn } from "@/components/crud/CrudTable";
import { CrudModal } from "@/components/crud/CrudModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Patient } from "@/types/entities";
import { patientsService } from "@/services/patientsService";
import BasicRegistrationForm from "./UserRegistration/BasicRegistrationForm";
import PlayerTypeSelection from "./UserRegistration/PlayerTypeSelection";
import DynamicAttributesForm from "./UserRegistration/DynamicAttributesForm";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRegisterPatient } from "@/hooks/useRegisterPatient";

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    selectedCategory,
    selectedParentType,
    selectedChildType,
    selectedSpecialization,
    categories,
    categorizedPlayerTypes,
    childTypes,
    specializations,

    formValues,
    formErrors,
    attributeValues,

    // UI state
    isLoading,
    isLoadingCategories,
    isLoadingAttributes,

    // Computed values
    attributes,
    groupedAttributes,

    handleCategoryChange,
    handleParentTypeChange,
    handleChildTypeChange,
    handleSpecializationChange,
    handleAttributeValueChange,
    handleInputChange,
    handleSubmit,

    parseOptions,
  } = useRegisterPatient();

  // useEffect(() => {
  //   loadPatients();
  // }, []);


  const shouldShowDynamicForm = Boolean(
    selectedCategory && 
    attributes && 
    attributes.length > 0 && 
    groupedAttributes && 
    Object.keys(groupedAttributes).length > 0
  );

  // Log visibility decision
  useEffect(() => {
    console.log('shouldShowDynamicForm:', shouldShowDynamicForm, {
      selectedCategory,
      attributesLength: attributes?.length,
      groupKeys: groupedAttributes ? Object.keys(groupedAttributes) : []
    });
  }, [shouldShowDynamicForm, selectedCategory, attributes, groupedAttributes]);


  // const loadPatients = async () => {
  //   try {
  //     setIsLoading(true);
  //     const data = await patientsService.getPatients();
  //     setPatients(data);
  //   } catch (error) {
  //     toast.error("Failed to load patients");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleAdd = () => {
    setEditingPatient(null);
    // reset();
    setIsModalOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    // reset(patient);
    setIsModalOpen(true);
  };

  const handleDelete = async (patient: Patient) => {
    if (window.confirm(`Are you sure you want to delete ${patient.name}?`)) {
      try {
        await patientsService.deletePatient(patient.id);
        setPatients(patients.filter((p) => p.id !== patient.id));
        toast.success("Patient deleted successfully");
      } catch (error) {
        toast.error("Failed to delete patient");
      }
    }
  };

  // const onSubmit = async (data: Patient) => {
  //   try {
  //     setIsSubmitting(true);

  //     if (editingPatient) {
  //       const updated = await patientsService.updatePatient(
  //         editingPatient.id,
  //         data
  //       );
  //       setPatients(
  //         patients.map((p) => (p.id === editingPatient.id ? updated : p))
  //       );
  //       toast.success("Patient updated successfully");
  //     } else {
  //       const newPatient = await patientsService.createPatient({
  //         ...data,
  //         totalAppointments: 0,
  //       });
  //       setPatients([...patients, newPatient]);
  //       toast.success("Patient created successfully");
  //     }

  //     setIsModalOpen(false);
  //     reset();
  //   } catch (error) {
  //     toast.error("Failed to save patient");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const columns: CrudColumn<Patient>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "age",
      label: "Age",
      sortable: true,
    },
    {
      key: "gender",
      label: "Gender",
      render: (patient) => <Badge variant="outline">{patient.gender}</Badge>,
    },
    {
      key: "status",
      label: "Status",
      render: (patient) => (
        <Badge variant={patient.status === "active" ? "default" : "secondary"}>
          {patient.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: "lastVisit",
      label: "Last Visit",
      render: (patient) => new Date(patient.lastVisit).toLocaleDateString(),
      sortable: true,
    },
    {
      key: "totalAppointments",
      label: "Appointments",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <div className="space-y-6">
      <CrudTable
        title="Patients"
        description="Manage patient records and information"
        data={patients}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search patients..."
        isLoading={isLoading}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPatient ? "Edit Patient" : "Add New Patient"}
        description={
          editingPatient
            ? "Update patient information"
            : "Add a new patient record"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Basic Registration Form */}
            <BasicRegistrationForm
              formValues={formValues}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
            />

            {/* Player Type Selection */}
            <PlayerTypeSelection
              isLoadingCategories={isLoadingCategories}
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
              categorizedPlayerTypes={categorizedPlayerTypes}
              selectedParentType={selectedParentType}
              handleParentTypeChange={handleParentTypeChange}
              childTypes={childTypes}
              selectedChildType={selectedChildType}
              handleChildTypeChange={handleChildTypeChange}
              specializations={specializations}
              selectedSpecialization={selectedSpecialization}
              handleSpecializationChange={handleSpecializationChange}
            />

            {/* Dynamic Attributes Form */}
            {shouldShowDynamicForm && (
              <DynamicAttributesForm
                isLoadingAttributes={isLoadingAttributes}
                groupedAttributes={groupedAttributes}
                attributeValues={attributeValues}
                handleAttributeValueChange={handleAttributeValueChange}
                parseOptions={parseOptions}
              />
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium">
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </CrudModal>
    </div>
  );
};

export default PatientsPage;
