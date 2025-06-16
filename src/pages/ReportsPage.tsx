
import { useState } from 'react';
import { CrudTable, CrudColumn } from '@/components/crud/CrudTable';
import { CrudModal } from '@/components/crud/CrudModal';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, BarChart, Users, DollarSign } from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: string;
  description?: string;
  status: 'ready' | 'generating' | 'error';
  lastGenerated: string;
  size: string;
  createdBy: string;
  createdAt: string;
}

const dummyReports: Report[] = [
  {
    id: '1',
    name: 'Monthly User Activity Report',
    type: 'user_activity',
    description: 'User registration, activity, and engagement metrics',
    status: 'ready',
    lastGenerated: '2024-01-15',
    size: '2.3 MB',
    createdBy: 'Admin User',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Financial Summary Report', 
    type: 'financial',
    description: 'Revenue, commission, and payment analytics',
    status: 'generating',
    lastGenerated: '2024-01-10',
    size: '1.8 MB',
    createdBy: 'Financial Admin',
    createdAt: '2024-01-10T14:22:00Z'
  },
  {
    id: '3',
    name: 'Provider Performance Analytics',
    type: 'performance',
    description: 'Provider performance and service quality metrics',
    status: 'ready',
    lastGenerated: '2024-01-12',
    size: '3.1 MB',
    createdBy: 'Content Moderator',
    createdAt: '2024-01-12T16:45:00Z'
  }
];

const reportTypes = [
  {
    name: "User Reports",
    icon: Users,
    description: "User registration, activity, and engagement metrics",
    color: "bg-blue-500"
  },
  {
    name: "Financial Reports",
    icon: DollarSign,
    description: "Revenue, commission, and payment analytics",
    color: "bg-green-500"
  },
  {
    name: "Performance Reports", 
    icon: BarChart,
    description: "Provider performance and service quality metrics",
    color: "bg-purple-500"
  }
];

const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>(dummyReports);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Report | null>(null);
  const [formData, setFormData] = useState<Partial<Report>>({});
  const { toast } = useToast();

  const columns: CrudColumn<Report>[] = [
    {
      key: 'name',
      label: 'Report Name',
      sortable: true,
    },
    {
      key: 'type',
      label: 'Type',
      render: (item) => (
        <Badge variant="outline">
          {item.type.replace('_', ' ')}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <Badge variant={
          item.status === 'ready' ? 'default' : 
          item.status === 'generating' ? 'secondary' : 'destructive'
        }>
          {item.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: 'lastGenerated',
      label: 'Last Generated',
      sortable: true,
    },
    {
      key: 'size',
      label: 'Size',
      sortable: true,
    },
    {
      key: 'createdBy',
      label: 'Created By',
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

  const handleEdit = (item: Report) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Report) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(r => r.id !== item.id));
      toast({ title: 'Report deleted successfully' });
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.type) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    if (editingItem) {
      setReports(reports.map(r => 
        r.id === editingItem.id ? { ...r, ...formData } as Report : r
      ));
      toast({ title: 'Report updated successfully' });
    } else {
      const newReport: Report = {
        id: Date.now().toString(),
        name: formData.name!,
        type: formData.type!,
        description: formData.description,
        status: 'generating',
        lastGenerated: new Date().toISOString().split('T')[0],
        size: '0 KB',
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
      };
      setReports([...reports, newReport]);
      toast({ title: 'Report created successfully' });
    }

    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600">Generate and download platform reports</p>
        </div>
        <Button onClick={handleAdd}>Generate New Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportTypes.map((type, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{type.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{type.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CrudTable
        title="Recent Reports"
        description="Manage and track generated reports"
        data={reports}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search reports..."
        isLoading={false}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Report' : 'Generate New Report'}
        onSubmit={handleSubmit}
        isSubmitting={false}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Report Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Report name"
            />
          </div>
          <div>
            <Label htmlFor="type">Report Type *</Label>
            <Select value={formData.type || ''} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user_activity">User Activity</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Report description (optional)"
            />
          </div>
        </div>
      </CrudModal>
    </div>
  );
};

export default ReportsPage;
