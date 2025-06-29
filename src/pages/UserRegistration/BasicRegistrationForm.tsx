
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

interface BasicRegistrationFormProps {
  formValues: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string;
  };
  formErrors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicRegistrationForm: React.FC<BasicRegistrationFormProps> = ({
  formValues,
  formErrors,
  handleInputChange
}) => {
  return (
    <>
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />
        {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
      </div>
      
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="johndoe@example.com"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
      </div>
      
      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
        {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
      </div>
      
      {/* Password Confirmation */}
      <div className="space-y-2">
        <Label htmlFor="password_confirmation">Confirm Password</Label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          value={formValues.password_confirmation}
          onChange={handleInputChange}
          required
        />
        {formErrors.password_confirmation && <p className="text-red-500 text-sm">{formErrors.password_confirmation}</p>}
      </div>
      
      {/* Phone number */}
      <div className="space-y-2">
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          name="phone_number"
          value={formValues.phone_number}
          onChange={handleInputChange}
          required
        />
        {formErrors.phone_number && <p className="text-red-500 text-sm">{formErrors.phone_number}</p>}
      </div>
    </>
  );
};

export default BasicRegistrationForm;
