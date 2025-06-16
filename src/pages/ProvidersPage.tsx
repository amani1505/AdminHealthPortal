
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CrudTable, CrudColumn } from '@/components/crud/CrudTable';
import { CrudModal } from '@/components/crud/CrudModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Provider } from '@/types/entities';
import { providersService } from '@/services/providersService';

const ProvidersPage = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Provider>();

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      setIsLoading(true);
      const data = await providersService.getProviders();
      setProviders(data);
    } catch (error) {
      toast.error('Failed to load providers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProvider(null);
    reset();
    setIsModalOpen(true);
  };

  const handleEdit = (provider: Provider) => {
    setEditingProvider(provider);
    reset(provider);
    setIsModalOpen(true);
  };

  const handleDelete = async (provider: Provider) => {
    if (window.confirm(`Are you sure you want to delete ${provider.name}?`)) {
      try {
        await providersService.deleteProvider(provider.id);
        setProviders(providers.filter(p => p.id !== provider.id));
        toast.success('Provider deleted successfully');
      } catch (error) {
        toast.error('Failed to delete provider');
      }
    }
  };

  const onSubmit = async (data: Provider) => {
    try {
      setIsSubmitting(true);
      
      if (editingProvider) {
        const updated = await providersService.updateProvider(editingProvider.id, data);
        setProviders(providers.map(p => p.id === editingProvider.id ? updated : p));
        toast.success('Provider updated successfully');
      } else {
        const newProvider = await providersService.createProvider({
          ...data,
          joinedDate: new Date().toISOString().split('T')[0],
          totalPatients: 0,
          revenue: 0,
          rating: 0
        });
        setProviders([...providers, newProvider]);
        toast.success('Provider created successfully');
      }
      
      setIsModalOpen(false);
      reset();
    } catch (error) {
      toast.error('Failed to save provider');
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: CrudColumn<Provider>[] = [
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
      key: 'specialty',
      label: 'Specialty',
      sortable: true,
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (provider) => (
        <Badge variant={provider.status === 'active' ? 'default' : provider.status === 'pending' ? 'secondary' : 'destructive'}>
          {provider.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: 'totalPatients',
      label: 'Patients',
      sortable: true,
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (provider) => `${provider.rating}/5`,
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
        title="Healthcare Providers"
        description="Manage healthcare providers, their specialties, and status"
        data={providers}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search providers..."
        isLoading={isLoading}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProvider ? 'Edit Provider' : 'Add New Provider'}
        description={editingProvider ? 'Update provider information' : 'Add a new healthcare provider'}
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
                placeholder="Dr. John Doe"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="john.doe@hospital.com"
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
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                {...register('specialty', { required: 'Specialty is required' })}
                placeholder="Cardiology"
              />
              {errors.specialty && <span className="text-red-500 text-sm">{errors.specialty.message}</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register('location', { required: 'Location is required' })}
                placeholder="New York, NY"
              />
              {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={watch('status')} onValueChange={(value) => setValue('status', value as Provider['status'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CrudModal>
    </div>
  );
};

export default ProvidersPage;
