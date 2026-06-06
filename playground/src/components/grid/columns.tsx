import { ColumnDefinition, createColumn } from '@core';

export const columnDefs: ColumnDefinition[] = [
  createColumn({
    id: 'personalGroup',
    title: 'Personal Information',
    children: [
      createColumn({
        id: 'firstName',
        title: 'First Name',
        cellRenderer: (data) => data.firstName,
        children: [
          createColumn({
            id: 'middleName',
            title: 'Middle Name',
            cellRenderer: (data) => data.middleName,
          }),
          createColumn({
            id: 'lastName',
            title: 'Last Name',
            cellRenderer: (data) => data.lastName,
          }),
        ],
      }),
    ],
  }),
  createColumn({
    id: 'contactGroup',
    title: 'Contact Information',
    children: [
      createColumn({
        id: 'mobilePhone',
        title: 'Mobile Phone',
        cellRenderer: (data) => data.mobilePhone,
      }),
      createColumn({
        id: 'homePhone',
        title: 'Home Phone',
        cellRenderer: (data) => data.homePhone,
      }),
    ],
  }),
  createColumn({
    id: 'Address',
    title: 'Address details',
  }),
  createColumn({
    id: 'employmentGroup',
    title: 'Employment Information',
    children: [
      createColumn({
        id: 'jobTitle',
        title: 'Job Title',
        cellRenderer: (data) => data.jobTitle,
      }),
      createColumn({
        id: 'department',
        title: 'Department',
        cellRenderer: (data) => data.department,
      }),
      createColumn({
        id: 'division',
        title: 'Division',
        cellRenderer: (data) => data.division,
      }),
      createColumn({
        id: 'team',
        title: 'Team',
        cellRenderer: (data) => data.team,
      }),
      createColumn({
        id: 'role',
        title: 'Role',
        cellRenderer: (data) => data.role,
      }),
      createColumn({
        id: 'hireDate',
        title: 'Hire Date',
        cellRenderer: (data) => data.hireDate,
      }),
      createColumn({
        id: 'terminationDate',
        title: 'Termination Date',
        cellRenderer: (data) => data.terminationDate,
      }),
      createColumn({
        id: 'tenure',
        title: 'Tenure',
        cellRenderer: (data) => data.tenure,
      }),
      createColumn({
        id: 'employeeId',
        title: 'Employee ID',
        cellRenderer: (data) => data.employeeId,
      }),
      createColumn({
        id: 'employmentType',
        title: 'Employment Type',
        cellRenderer: (data) => data.employmentType,
      }),
      createColumn({
        id: 'manager',
        title: 'Manager',
        cellRenderer: (data) => data.manager,
      }),
      createColumn({
        id: 'location',
        title: 'Location',
        cellRenderer: (data) => data.location,
      }),
      createColumn({
        id: 'workSchedule',
        title: 'Work Schedule',
        cellRenderer: (data) => data.workSchedule,
      }),
      createColumn({
        id: 'remoteStatus',
        title: 'Remote Status',
        cellRenderer: (data) => data.remoteStatus,
      }),
    ],
  }),
  createColumn({
    id: 'financialGroup',
    title: 'Financial Information',
    children: [
      createColumn({
        id: 'baseSalary',
        title: 'Base Salary',
        cellRenderer: (data) => data.baseSalary,
      }),
      createColumn({
        id: 'bonus',
        title: 'Bonus',
        cellRenderer: (data) => data.bonus,
      }),
      createColumn({
        id: 'commission',
        title: 'Commission',
        cellRenderer: (data) => data.commission,
      }),
    ],
  }),
];
