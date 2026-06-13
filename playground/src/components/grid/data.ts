import { faker } from '@faker-js/faker';

export type EmployeeData = {
  team: string;
  role: string;
  bonus: string;
  tenure: string;
  manager: string;
  lastName: string;
  jobTitle: string;
  division: string;
  hireDate: string;
  location: string;
  firstName: string;
  homePhone: string;
  middleName: string;
  department: string;
  employeeId: string;
  baseSalary: string;
  commission: string;
  mobilePhone: string;
  workSchedule: string;
  remoteStatus: string;
  employmentType: string;
  terminationDate: string;
};

const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Finance',
  'Human Resources',
  'Legal',
  'Operations',
  'Customer Success',
  'Analytics',
  'Administration',
];

const divisions = [
  'Product Development',
  'Infrastructure',
  'Consumer Products',
  'Brand',
  'Enterprise',
  'Corporate Finance',
  'People Operations',
  'Business Intelligence',
  'Client Services',
  'Creative',
  'Digital',
  'Supply Chain',
];

const teams = [
  'Platform',
  'Web',
  'Mobile',
  'API',
  'Cloud Services',
  'Growth',
  'Content',
  'North America',
  'EMEA',
  'FP&A',
  'Talent',
  'Compliance',
  'Reporting',
  'Security',
  'Design Systems',
  'SDR',
];

const roles = ['Individual Contributor', 'Senior', 'Lead', 'Manager', 'Director', 'Executive'];

const employmentTypes = ['Full-Time', 'Part-Time', 'Contract', 'Intern'];

const workSchedules = [
  '9:00 AM - 5:00 PM',
  '8:00 AM - 4:00 PM',
  '8:30 AM - 5:30 PM',
  '10:00 AM - 6:00 PM',
  '7:30 AM - 4:30 PM',
  'Flexible',
  'Rotating Shifts',
];

const remoteStatuses = ['Remote', 'On-Site', 'Hybrid'];

const formatCurrency = (amount: number): string => `$${amount.toLocaleString('en-US')}`;

const calculateTenure = (hireDate: Date): string => {
  const now = new Date();
  const years = now.getFullYear() - hireDate.getFullYear();
  const months = now.getMonth() - hireDate.getMonth();
  if (years < 1) return `${Math.max(1, months)} months`;
  if (months < 0) return `${years - 1} years`;
  return `${years} years`;
};

const generateEmployee = (index: number): EmployeeData => {
  const hireDate = faker.date.between({
    to: '2025-12-31',
    from: '2013-01-01',
  });

  const isTerminated = faker.datatype.boolean({ probability: 0.1 });
  const terminationDate = isTerminated
    ? faker.date.between({ from: hireDate, to: new Date() })
    : null;

  const baseSalary = faker.number.int({ min: 40000, max: 350000 });
  const hasBonus = faker.datatype.boolean({ probability: 0.85 });
  const hasCommission = faker.datatype.boolean({ probability: 0.15 });

  return {
    manager: faker.person.fullName(),
    lastName: faker.person.lastName(),
    jobTitle: faker.person.jobTitle(),
    tenure: calculateTenure(hireDate),
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    baseSalary: formatCurrency(baseSalary),
    team: faker.helpers.arrayElement(teams),
    role: faker.helpers.arrayElement(roles),
    hireDate: hireDate.toISOString().split('T')[0],
    division: faker.helpers.arrayElement(divisions),
    department: faker.helpers.arrayElement(departments),
    homePhone: faker.phone.number({ style: 'national' }),
    mobilePhone: faker.phone.number({ style: 'national' }),
    employeeId: `EMP-${String(index + 1).padStart(3, '0')}`,
    workSchedule: faker.helpers.arrayElement(workSchedules),
    remoteStatus: faker.helpers.arrayElement(remoteStatuses),
    employmentType: faker.helpers.arrayElement(employmentTypes),
    location: `${faker.location.city()}, ${faker.location.state()}`,
    bonus: hasBonus ? formatCurrency(faker.number.int({ min: 2000, max: 80000 })) : '',
    terminationDate: terminationDate ? terminationDate.toISOString().split('T')[0] : '',
    commission: hasCommission ? formatCurrency(faker.number.int({ min: 5000, max: 50000 })) : '',
  };
};

export const data: EmployeeData[] = Array.from({ length: 50 }, (_, i) => generateEmployee(i));
