
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CrudTable, CrudColumn } from '@/components/crud/CrudTable';
import { CrudModal } from '@/components/crud/CrudModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Patient } from '@/types/entities';
import { patientsService } from '@/services/patientsService';

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Patient>();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setIsLoading(true);
      const data = await patientsService.getPatients();
      setPatients(data);
    } catch (error) {
      toast.error('Failed to load patients');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingPatient(null);
    reset();
    setIsModalOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    reset(patient);
    setIsModalOpen(true);
  };

  const handleDelete = async (patient: Patient) => {
    if (window.confirm(`Are you sure you want to delete ${patient.name}?`)) {
      try {
        await patientsService.deletePatient(patient.id);
        setPatients(patients.filter(p => p.id !== patient.id));
        toast.success('Patient deleted successfully');
      } catch (error) {
        toast.error('Failed to delete patient');
      }
    }
  };

  const onSubmit = async (data: Patient) => {
    try {
      setIsSubmitting(true);
      
      if (editingPatient) {
        const updated = await patientsService.updatePatient(editingPatient.id, data);
        setPatients(patients.map(p => p.id === editingPatient.id ? updated : p));
        toast.success('Patient updated successfully');
      } else {
        const newPatient = await patientsService.createPatient({
          ...data,
          totalAppointments: 0
        });
        setPatients([...patients, newPatient]);
        toast.success('Patient created successfully');
      }
      
      setIsModalOpen(false);
      reset();
    } catch (error) {
      toast.error('Failed to save patient');
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: CrudColumn<Patient>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'age',
      label: 'Age',
      sortable: true,
    },
    {
      key: 'gender',
      label: 'Gender',
      render: (patient) => (
        <Badge variant="outline">
          {patient.gender}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (patient) => (
        <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
          {patient.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: 'lastVisit',
      label: 'Last Visit',
      render: (patient) => new Date(patient.lastVisit).toLocaleDateString(),
      sortable: true,
    },
    {
      key: 'totalAppointments',
      label: 'Appointments',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
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
        title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
        description={editingPatient ? 'Update patient information' : 'Add a new patient record'}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Name is required' })}
                placeholder="John Doe"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="john.doe@email.com"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register('phone', { required: 'Phone is required' })}
                placeholder="+1-555-0123"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                {...register('age', { required: 'Age is required', min: 1, max: 120 })}
                placeholder="30"
              />
              {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={watch('gender')} onValueChange={(value) => setValue('gender', value as Patient['gender'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={watch('status')} onValueChange={(value) => setValue('status', value as Patient['status'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register('address', { required: 'Address is required' })}
              placeholder="123 Main St, City, State 12345"
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lastVisit">Last Visit</Label>
              <Input
                id="lastVisit"
                type="date"
                {...register('lastVisit', { required: 'Last visit date is required' })}
              />
              {errors.lastVisit && <span className="text-red-500 text-sm">{errors.lastVisit.message}</span>}
            </div>
            <div>
              <Label htmlFor="providerId">Provider ID</Label>
              <Input
                id="providerId"
                {...register('providerId', { required: 'Provider ID is required' })}
                placeholder="1"
              />
              {errors.providerId && <span className="text-red-500 text-sm">{errors.providerId.message}</span>}
            </div>
          </div>
        </form>
      </CrudModal>
    </div>
  );
};

export default PatientsPage;
