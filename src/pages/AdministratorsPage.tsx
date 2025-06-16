
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CrudTable, CrudColumn } from '@/components/crud/CrudTable';
import { CrudModal } from '@/components/crud/CrudModal';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { administratorsService } from '@/services/administratorsService';
import { Administrator } from '@/types/entities';

const AdministratorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Administrator | null>(null);
  const [formData, setFormData] = useState<Partial<Administrator>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: administrators = [], isLoading } = useQuery({
    queryKey: ['administrators'],
    queryFn: administratorsService.getAdministrators,
  });

  const createMutation = useMutation({
    mutationFn: administratorsService.createAdministrator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['administrators'] });
      toast({ title: 'Administrator created successfully' });
      setIsModalOpen(false);
      setFormData({});
    },
    onError: () => {
      toast({ title: 'Error creating administrator', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Administrator> }) =>
      administratorsService.updateAdministrator(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['administrators'] });
      toast({ title: 'Administrator updated successfully' });
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
    },
    onError: () => {
      toast({ title: 'Error updating administrator', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: administratorsService.deleteAdministrator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['administrators'] });
      toast({ title: 'Administrator deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Error deleting administrator', variant: 'destructive' });
    },
  });

  const columns: CrudColumn<Administrator>[] = [
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
      key: 'role',
      label: 'Role',
      render: (item) => (
        <Badge variant={item.role === 'super_admin' ? 'destructive' : 'default'}>
          {item.role.replace('_', ' ')}
        </Badge>
      ),
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
      key: 'lastLogin',
      label: 'Last Login',
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

  const handleEdit = (item: Administrator) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Administrator) => {
    if (confirm('Are you sure you want to delete this administrator?')) {
      deleteMutation.mutate(item.id);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      const newAdmin: Omit<Administrator, 'id'> = {
        name: formData.name!,
        email: formData.email!,
        role: formData.role!,
        status: formData.status || 'active',
        lastLogin: new Date().toISOString(),
        permissions: formData.permissions || [],
        createdAt: new Date().toISOString(),
      };
      createMutation.mutate(newAdmin);
    }
  };

  return (
    <div className="space-y-6">
      <CrudTable
        title="Administrators"
        description="Manage administrator accounts and permissions"
        data={administrators}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search administrators..."
        isLoading={isLoading}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Administrator' : 'Add Administrator'}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Administrator name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="administrator@example.com"
            />
          </div>
          <div>
            <Label htmlFor="role">Role *</Label>
            <Select value={formData.role || ''} onValueChange={(value) => setFormData({ ...formData, role: value as Administrator['role'] })}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status || 'active'} onValueChange={(value) => setFormData({ ...formData, status: value as Administrator['status'] })}>
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

export default AdministratorsPage;
