import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CrudTable, CrudColumn } from '@/components/crud/CrudTable';
import { CrudModal } from '@/components/crud/CrudModal';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { servicesService } from '@/services/servicesService';
import { Service } from '@/types/entities';

const ServicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: servicesService.getServices,
  });

  const createMutation = useMutation({
    mutationFn: servicesService.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ 
        title: 'Service created successfully',
        description: 'The service has been added to the platform.',
        variant: 'success'
      });
      setIsModalOpen(false);
      setFormData({});
    },
    onError: () => {
      toast({ 
        title: 'Error creating service', 
        description: 'There was a problem creating the service. Please try again.',
        variant: 'destructive' 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Service> }) =>
      servicesService.updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ 
        title: 'Service updated successfully',
        description: 'The service information has been updated.',
        variant: 'success'
      });
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
    },
    onError: () => {
      toast({ 
        title: 'Error updating service', 
        description: 'There was a problem updating the service. Please try again.',
        variant: 'destructive' 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: servicesService.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ 
        title: 'Service deleted successfully',
        description: 'The service has been removed from the platform.',
        variant: 'success'
      });
    },
    onError: () => {
      toast({ 
        title: 'Error deleting service', 
        description: 'There was a problem deleting the service. Please try again.',
        variant: 'destructive' 
      });
    },
  });

  const columns: CrudColumn<Service>[] = [
    {
      key: 'name',
      label: 'Service Name',
      sortable: true,
    },
    {
      key: 'providerName',
      label: 'Provider',
      sortable: true,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
    },
    {
      key: 'price',
      label: 'Price',
      render: (item) => `$${item.price.toFixed(2)}`,
      sortable: true,
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (item) => `${item.duration} min`,
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
          {item.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (item) => `${item.rating} ⭐`,
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: Service) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Service) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteMutation.mutate(item.id);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.category || !formData.price || !formData.duration) {
      toast({ 
        title: 'Please fill in all required fields', 
        description: 'Name, description, category, price, and duration are required.',
        variant: 'warning' 
      });
      return;
    }

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      const newService: Omit<Service, 'id'> = {
        name: formData.name!,
        description: formData.description!,
        category: formData.category!,
        price: Number(formData.price!),
        duration: Number(formData.duration!),
        providerId: formData.providerId || 'temp_id',
        providerName: formData.providerName || 'Unknown Provider',
        status: formData.status || 'active',
        rating: formData.rating || 0,
        totalBookings: 0,
        createdAt: new Date().toISOString(),
      };
      createMutation.mutate(newService);
    }
  };

  return (
    <div className="space-y-6">
      <CrudTable
        title="Service Listings"
        description="Manage healthcare service listings and content moderation"
        data={services}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search services..."
        isLoading={isLoading}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Service' : 'Add Service'}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Service Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Service name"
            />
          </div>
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Service description"
            />
          </div>
          <div>
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g., Cardiology, Dermatology"
            />
          </div>
          <div>
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              placeholder="0.00"
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration (minutes) *</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration || ''}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              placeholder="60"
            />
          </div>
          <div>
            <Label htmlFor="providerName">Provider Name</Label>
            <Input
              id="providerName"
              value={formData.providerName || ''}
              onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
              placeholder="Provider name"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status || 'active'} onValueChange={(value) => setFormData({ ...formData, status: value as Service['status'] })}>
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
      </CrudModal>
    </div>
  );
};

export default ServicesPage;
