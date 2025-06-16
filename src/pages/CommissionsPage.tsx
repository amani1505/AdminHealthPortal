
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CrudTable, CrudColumn } from '@/components/crud/CrudTable';
import { CrudModal } from '@/components/crud/CrudModal';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { commissionsService } from '@/services/commissionsService';
import { Commission } from '@/types/entities';

const CommissionsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Commission | null>(null);
  const [formData, setFormData] = useState<Partial<Commission>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: commissions = [], isLoading } = useQuery({
    queryKey: ['commissions'],
    queryFn: commissionsService.getCommissions,
  });

  const createMutation = useMutation({
    mutationFn: commissionsService.createCommission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
      toast({ title: 'Commission created successfully' });
      setIsModalOpen(false);
      setFormData({});
    },
    onError: () => {
      toast({ title: 'Error creating commission', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Commission> }) =>
      commissionsService.updateCommission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
      toast({ title: 'Commission updated successfully' });
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
    },
    onError: () => {
      toast({ title: 'Error updating commission', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: commissionsService.deleteCommission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
      toast({ title: 'Commission deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Error deleting commission', variant: 'destructive' });
    },
  });

  const columns: CrudColumn<Commission>[] = [
    {
      key: 'providerName',
      label: 'Provider',
      sortable: true,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (item) => `$${item.amount.toFixed(2)}`,
      sortable: true,
    },
    {
      key: 'percentage',
      label: 'Percentage',
      render: (item) => `${item.percentage}%`,
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <Badge variant={
          item.status === 'paid' ? 'default' : 
          item.status === 'pending' ? 'secondary' : 'destructive'
        }>
          {item.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: 'period',
      label: 'Period',
      sortable: true,
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (item) => new Date(item.createdAt).toLocaleDateString(),
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

  const handleEdit = (item: Commission) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Commission) => {
    if (confirm('Are you sure you want to delete this commission?')) {
      deleteMutation.mutate(item.id);
    }
  };

  const handleSubmit = () => {
    if (!formData.providerName || !formData.amount || !formData.percentage) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      const newCommission: Omit<Commission, 'id'> = {
        providerId: formData.providerId || 'temp_id',
        providerName: formData.providerName!,
        amount: Number(formData.amount!),
        percentage: Number(formData.percentage!),
        status: formData.status || 'pending',
        period: formData.period || new Date().toISOString().slice(0, 7),
        createdAt: new Date().toISOString(),
      };
      createMutation.mutate(newCommission);
    }
  };

  return (
    <div className="space-y-6">
      <CrudTable
        title="Commission Tracking"
        description="Manage provider commissions and payments"
        data={commissions}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search commissions..."
        isLoading={isLoading}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Commission' : 'Add Commission'}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="providerName">Provider Name *</Label>
            <Input
              id="providerName"
              value={formData.providerName || ''}
              onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
              placeholder="Provider name"
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount || ''}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              placeholder="0.00"
            />
          </div>
          <div>
            <Label htmlFor="percentage">Percentage *</Label>
            <Input
              id="percentage"
              type="number"
              value={formData.percentage || ''}
              onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) })}
              placeholder="15"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status || 'pending'} onValueChange={(value) => setFormData({ ...formData, status: value as Commission['status'] })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="period">Period</Label>
            <Input
              id="period"
              value={formData.period || ''}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              placeholder="2024-01"
            />
          </div>
        </div>
      </CrudModal>
    </div>
  );
};

export default CommissionsPage;
