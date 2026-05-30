import { createColumn } from '@core';
import { Grid as ZetaGrid } from '@react';

const columnDefs = [
  // ── Group 1: Personal Info (12 leaf columns) ──
  createColumn({
    id: 'personalInfo',
    title: 'Personal Info',
    accessor: 'personalInfo',
    children: [
      createColumn({
        id: 'nameGroup',
        title: 'Name',
        accessor: 'nameGroup',
        children: [
          createColumn({ id: 'firstName', title: 'First Name', accessor: 'firstName' }),
          createColumn({ id: 'middleName', title: 'Middle Name', accessor: 'middleName' }),
          createColumn({ id: 'lastName', title: 'Last Name', accessor: 'lastName' }),
          createColumn({ id: 'nickname', title: 'Nickname', accessor: 'nickname' }),
        ],
      }),
      createColumn({
        id: 'demographicsGroup',
        title: 'Demographics',
        accessor: 'demographicsGroup',
        children: [
          createColumn({ id: 'age', title: 'Age', accessor: 'age', width: 80 }),
          createColumn({ id: 'gender', title: 'Gender', accessor: 'gender', width: 100 }),
          createColumn({
            id: 'dateOfBirth',
            title: 'Date of Birth',
            accessor: 'dateOfBirth',
            width: 140,
          }),
          createColumn({
            id: 'nationality',
            title: 'Nationality',
            accessor: 'nationality',
            width: 140,
          }),
        ],
      }),
      createColumn({
        id: 'maritalStatus',
        title: 'Marital Status',
        accessor: 'maritalStatus',
        width: 130,
      }),
      createColumn({ id: 'bloodType', title: 'Blood Type', accessor: 'bloodType', width: 100 }),
      createColumn({ id: 'ssn', title: 'SSN', accessor: 'ssn', width: 140 }),
      createColumn({
        id: 'driverLicense',
        title: 'Driver License',
        accessor: 'driverLicense',
        width: 150,
      }),
    ],
  }),

  // ── Group 2: Contact (10 leaf columns) ──
  createColumn({
    id: 'contact',
    title: 'Contact',
    accessor: 'contact',
    children: [
      createColumn({
        id: 'phoneGroup',
        title: 'Phone',
        accessor: 'phoneGroup',
        children: [
          createColumn({
            id: 'mobilePhone',
            title: 'Mobile Phone',
            accessor: 'mobilePhone',
            width: 150,
          }),
          createColumn({ id: 'homePhone', title: 'Home Phone', accessor: 'homePhone', width: 150 }),
          createColumn({ id: 'workPhone', title: 'Work Phone', accessor: 'workPhone', width: 150 }),
        ],
      }),
      createColumn({
        id: 'emailGroup',
        title: 'Email',
        accessor: 'emailGroup',
        children: [
          createColumn({
            id: 'personalEmail',
            title: 'Personal Email',
            accessor: 'personalEmail',
            width: 220,
          }),
          createColumn({ id: 'workEmail', title: 'Work Email', accessor: 'workEmail', width: 220 }),
        ],
      }),
      createColumn({ id: 'fax', title: 'Fax', accessor: 'fax', width: 140 }),
      createColumn({ id: 'website', title: 'Website', accessor: 'website', width: 200 }),
      createColumn({ id: 'skype', title: 'Skype', accessor: 'skype', width: 150 }),
      createColumn({ id: 'slack', title: 'Slack Handle', accessor: 'slack', width: 150 }),
      createColumn({ id: 'telegram', title: 'Telegram', accessor: 'telegram', width: 150 }),
    ],
  }),

  // ── Group 3: Address (10 leaf columns) ──
  createColumn({
    id: 'address',
    title: 'Address',
    accessor: 'address',
    children: [
      createColumn({
        id: 'homeAddress',
        title: 'Home Address',
        accessor: 'homeAddress',
        children: [
          createColumn({ id: 'homeStreet', title: 'Street', accessor: 'homeStreet', width: 200 }),
          createColumn({ id: 'homeCity', title: 'City', accessor: 'homeCity', width: 140 }),
          createColumn({ id: 'homeState', title: 'State', accessor: 'homeState', width: 120 }),
          createColumn({ id: 'homeZip', title: 'Zip Code', accessor: 'homeZip', width: 100 }),
          createColumn({
            id: 'homeCountry',
            title: 'Country',
            accessor: 'homeCountry',
            width: 140,
          }),
        ],
      }),
      createColumn({
        id: 'workAddress',
        title: 'Work Address',
        accessor: 'workAddress',
        children: [
          createColumn({ id: 'workStreet', title: 'Street', accessor: 'workStreet', width: 200 }),
          createColumn({ id: 'workCity', title: 'City', accessor: 'workCity', width: 140 }),
          createColumn({ id: 'workState', title: 'State', accessor: 'workState', width: 120 }),
          createColumn({ id: 'workZip', title: 'Zip Code', accessor: 'workZip', width: 100 }),
          createColumn({
            id: 'workCountry',
            title: 'Country',
            accessor: 'workCountry',
            width: 140,
          }),
        ],
      }),
    ],
  }),

  // ── Group 4: Employment (14 leaf columns) ──
  createColumn({
    id: 'employment',
    title: 'Employment',
    accessor: 'employment',
    children: [
      createColumn({
        id: 'positionGroup',
        title: 'Position',
        accessor: 'positionGroup',
        children: [
          createColumn({ id: 'jobTitle', title: 'Job Title', accessor: 'jobTitle', width: 180 }),
          createColumn({
            id: 'department',
            title: 'Department',
            accessor: 'department',
            width: 160,
          }),
          createColumn({ id: 'division', title: 'Division', accessor: 'division', width: 140 }),
          createColumn({ id: 'team', title: 'Team', accessor: 'team', width: 140 }),
          createColumn({ id: 'role', title: 'Role', accessor: 'role', width: 120 }),
        ],
      }),
      createColumn({
        id: 'datesGroup',
        title: 'Dates',
        accessor: 'datesGroup',
        children: [
          createColumn({ id: 'hireDate', title: 'Hire Date', accessor: 'hireDate', width: 130 }),
          createColumn({
            id: 'terminationDate',
            title: 'Termination Date',
            accessor: 'terminationDate',
            width: 150,
          }),
          createColumn({ id: 'tenure', title: 'Tenure (Years)', accessor: 'tenure', width: 130 }),
        ],
      }),
      createColumn({ id: 'employeeId', title: 'Employee ID', accessor: 'employeeId', width: 130 }),
      createColumn({
        id: 'employmentType',
        title: 'Employment Type',
        accessor: 'employmentType',
        width: 150,
      }),
      createColumn({ id: 'manager', title: 'Manager', accessor: 'manager', width: 160 }),
      createColumn({ id: 'location', title: 'Office Location', accessor: 'location', width: 160 }),
      createColumn({
        id: 'workSchedule',
        title: 'Work Schedule',
        accessor: 'workSchedule',
        width: 140,
      }),
      createColumn({
        id: 'remoteStatus',
        title: 'Remote Status',
        accessor: 'remoteStatus',
        width: 130,
      }),
    ],
  }),

  // ── Group 5: Financial (12 leaf columns) ──
  createColumn({
    id: 'financial',
    title: 'Financial',
    accessor: 'financial',
    children: [
      createColumn({
        id: 'compensationGroup',
        title: 'Compensation',
        accessor: 'compensationGroup',
        children: [
          createColumn({
            id: 'baseSalary',
            title: 'Base Salary',
            accessor: 'baseSalary',
            width: 140,
          }),
          createColumn({ id: 'bonus', title: 'Bonus', accessor: 'bonus', width: 120 }),
          createColumn({
            id: 'commission',
            title: 'Commission',
            accessor: 'commission',
            width: 130,
          }),
          createColumn({
            id: 'stockOptions',
            title: 'Stock Options',
            accessor: 'stockOptions',
            width: 140,
          }),
        ],
      }),
      createColumn({
        id: 'deductionsGroup',
        title: 'Deductions',
        accessor: 'deductionsGroup',
        children: [
          createColumn({
            id: 'taxWithholding',
            title: 'Tax Withholding',
            accessor: 'taxWithholding',
            width: 150,
          }),
          createColumn({
            id: 'retirement401k',
            title: '401(k)',
            accessor: 'retirement401k',
            width: 120,
          }),
          createColumn({
            id: 'healthDeduction',
            title: 'Health Deduction',
            accessor: 'healthDeduction',
            width: 150,
          }),
        ],
      }),
      createColumn({
        id: 'payFrequency',
        title: 'Pay Frequency',
        accessor: 'payFrequency',
        width: 140,
      }),
      createColumn({
        id: 'bankAccount',
        title: 'Bank Account',
        accessor: 'bankAccount',
        width: 160,
      }),
      createColumn({
        id: 'routingNumber',
        title: 'Routing Number',
        accessor: 'routingNumber',
        width: 150,
      }),
      createColumn({ id: 'currency', title: 'Currency', accessor: 'currency', width: 100 }),
      createColumn({
        id: 'totalComp',
        title: 'Total Compensation',
        accessor: 'totalComp',
        width: 170,
      }),
    ],
  }),

  // ── Group 6: Performance (10 leaf columns) ──
  createColumn({
    id: 'performance',
    title: 'Performance',
    accessor: 'performance',
    children: [
      createColumn({
        id: 'ratingsGroup',
        title: 'Ratings',
        accessor: 'ratingsGroup',
        children: [
          createColumn({
            id: 'overallRating',
            title: 'Overall Rating',
            accessor: 'overallRating',
            width: 140,
          }),
          createColumn({
            id: 'selfRating',
            title: 'Self Rating',
            accessor: 'selfRating',
            width: 120,
          }),
          createColumn({
            id: 'managerRating',
            title: 'Manager Rating',
            accessor: 'managerRating',
            width: 140,
          }),
          createColumn({
            id: 'peerRating',
            title: 'Peer Rating',
            accessor: 'peerRating',
            width: 120,
          }),
        ],
      }),
      createColumn({
        id: 'goalsGroup',
        title: 'Goals',
        accessor: 'goalsGroup',
        children: [
          createColumn({ id: 'goalsSet', title: 'Goals Set', accessor: 'goalsSet', width: 110 }),
          createColumn({
            id: 'goalsCompleted',
            title: 'Goals Completed',
            accessor: 'goalsCompleted',
            width: 150,
          }),
          createColumn({
            id: 'completionRate',
            title: 'Completion Rate',
            accessor: 'completionRate',
            width: 150,
          }),
        ],
      }),
      createColumn({
        id: 'lastReviewDate',
        title: 'Last Review Date',
        accessor: 'lastReviewDate',
        width: 150,
      }),
      createColumn({
        id: 'nextReviewDate',
        title: 'Next Review Date',
        accessor: 'nextReviewDate',
        width: 150,
      }),
      createColumn({
        id: 'promotionEligible',
        title: 'Promotion Eligible',
        accessor: 'promotionEligible',
        width: 160,
      }),
    ],
  }),

  // ── Group 7: Education (8 leaf columns) ──
  createColumn({
    id: 'education',
    title: 'Education',
    accessor: 'education',
    children: [
      createColumn({
        id: 'degreeGroup',
        title: 'Degree',
        accessor: 'degreeGroup',
        children: [
          createColumn({
            id: 'highestDegree',
            title: 'Highest Degree',
            accessor: 'highestDegree',
            width: 150,
          }),
          createColumn({
            id: 'fieldOfStudy',
            title: 'Field of Study',
            accessor: 'fieldOfStudy',
            width: 160,
          }),
          createColumn({
            id: 'university',
            title: 'University',
            accessor: 'university',
            width: 200,
          }),
          createColumn({
            id: 'graduationYear',
            title: 'Graduation Year',
            accessor: 'graduationYear',
            width: 140,
          }),
        ],
      }),
      createColumn({
        id: 'certificationsGroup',
        title: 'Certifications',
        accessor: 'certificationsGroup',
        children: [
          createColumn({
            id: 'certName',
            title: 'Certification Name',
            accessor: 'certName',
            width: 180,
          }),
          createColumn({
            id: 'certIssuer',
            title: 'Issuing Body',
            accessor: 'certIssuer',
            width: 160,
          }),
          createColumn({ id: 'certDate', title: 'Issue Date', accessor: 'certDate', width: 130 }),
          createColumn({
            id: 'certExpiry',
            title: 'Expiry Date',
            accessor: 'certExpiry',
            width: 130,
          }),
        ],
      }),
    ],
  }),

  // ── Group 8: Health & Benefits (10 leaf columns) ──
  createColumn({
    id: 'healthBenefits',
    title: 'Health & Benefits',
    accessor: 'healthBenefits',
    children: [
      createColumn({
        id: 'insuranceGroup',
        title: 'Insurance',
        accessor: 'insuranceGroup',
        children: [
          createColumn({
            id: 'healthPlan',
            title: 'Health Plan',
            accessor: 'healthPlan',
            width: 150,
          }),
          createColumn({
            id: 'dentalPlan',
            title: 'Dental Plan',
            accessor: 'dentalPlan',
            width: 140,
          }),
          createColumn({
            id: 'visionPlan',
            title: 'Vision Plan',
            accessor: 'visionPlan',
            width: 140,
          }),
          createColumn({
            id: 'lifeInsurance',
            title: 'Life Insurance',
            accessor: 'lifeInsurance',
            width: 140,
          }),
        ],
      }),
      createColumn({
        id: 'leaveGroup',
        title: 'Leave Balances',
        accessor: 'leaveGroup',
        children: [
          createColumn({
            id: 'vacationDays',
            title: 'Vacation Days',
            accessor: 'vacationDays',
            width: 130,
          }),
          createColumn({ id: 'sickDays', title: 'Sick Days', accessor: 'sickDays', width: 110 }),
          createColumn({
            id: 'personalDays',
            title: 'Personal Days',
            accessor: 'personalDays',
            width: 130,
          }),
        ],
      }),
      createColumn({
        id: 'disability',
        title: 'Disability Coverage',
        accessor: 'disability',
        width: 170,
      }),
      createColumn({ id: 'fsa', title: 'FSA Balance', accessor: 'fsa', width: 130 }),
      createColumn({ id: 'hsa', title: 'HSA Balance', accessor: 'hsa', width: 130 }),
    ],
  }),

  // ── Group 9: System (8 leaf columns) ──
  createColumn({
    id: 'system',
    title: 'System',
    accessor: 'system',
    children: [
      createColumn({
        id: 'accountGroup',
        title: 'Account',
        accessor: 'accountGroup',
        children: [
          createColumn({ id: 'username', title: 'Username', accessor: 'username', width: 140 }),
          createColumn({
            id: 'accountStatus',
            title: 'Account Status',
            accessor: 'accountStatus',
            width: 140,
          }),
          createColumn({
            id: 'accessLevel',
            title: 'Access Level',
            accessor: 'accessLevel',
            width: 130,
          }),
        ],
      }),
      createColumn({
        id: 'auditGroup',
        title: 'Audit',
        accessor: 'auditGroup',
        children: [
          createColumn({ id: 'createdAt', title: 'Created At', accessor: 'createdAt', width: 170 }),
          createColumn({ id: 'updatedAt', title: 'Updated At', accessor: 'updatedAt', width: 170 }),
          createColumn({ id: 'lastLogin', title: 'Last Login', accessor: 'lastLogin', width: 170 }),
        ],
      }),
      createColumn({ id: 'ipAddress', title: 'IP Address', accessor: 'ipAddress', width: 140 }),
      createColumn({ id: 'deviceType', title: 'Device Type', accessor: 'deviceType', width: 130 }),
    ],
  }),

  // ── Group 10: Social & Engagement (6 leaf columns) ──
  createColumn({
    id: 'socialEngagement',
    title: 'Social & Engagement',
    accessor: 'socialEngagement',
    children: [
      createColumn({
        id: 'socialProfiles',
        title: 'Social Profiles',
        accessor: 'socialProfiles',
        children: [
          createColumn({ id: 'linkedIn', title: 'LinkedIn', accessor: 'linkedIn', width: 200 }),
          createColumn({ id: 'twitter', title: 'Twitter / X', accessor: 'twitter', width: 160 }),
          createColumn({ id: 'github', title: 'GitHub', accessor: 'github', width: 160 }),
        ],
      }),
      createColumn({
        id: 'engagementScore',
        title: 'Engagement Score',
        accessor: 'engagementScore',
        width: 150,
      }),
      createColumn({
        id: 'lastSurveyDate',
        title: 'Last Survey Date',
        accessor: 'lastSurveyDate',
        width: 150,
      }),
      createColumn({
        id: 'satisfactionRating',
        title: 'Satisfaction Rating',
        accessor: 'satisfactionRating',
        width: 160,
      }),
    ],
  }),
];

export const Grid = () => {
  return <ZetaGrid columnDefs={columnDefs} />;
};
