import { faker } from '@faker-js/faker';
import { RowData } from '@models';

export const generateMockData = (count = 100): RowData[] => {
  return Array.from({ length: count }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const middleName = faker.person.middleName();
    const nickname = faker.person.firstName();

    const baseSalary = faker.number.int({ min: 50000, max: 200000 });
    const bonus = faker.number.int({ min: 5000, max: 30000 });
    const commission = faker.number.int({ min: 0, max: 15000 });
    const totalComp = baseSalary + bonus + commission;

    const goalsSet = faker.number.int({ min: 3, max: 10 });
    const goalsCompleted = faker.number.int({ min: 0, max: goalsSet });
    const completionRate = Math.round((goalsCompleted / goalsSet) * 100);

    return {
      // Personal Info
      firstName,
      middleName,
      lastName,
      nickname,
      age: faker.number.int({ min: 18, max: 70 }),
      gender: faker.person.sex(),
      dateOfBirth: faker.date
        .birthdate({ min: 18, max: 70, mode: 'age' })
        .toISOString()
        .split('T')[0],
      nationality: faker.location.country(),
      maritalStatus: faker.helpers.arrayElement(['Single', 'Married', 'Divorced', 'Widowed']),
      bloodType: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      ssn: faker.string.numeric('###-##-####'),
      driverLicense: faker.string.alphanumeric({ length: 9, casing: 'upper' }),

      // Contact
      mobilePhone: faker.phone.number(),
      homePhone: faker.phone.number(),
      workPhone: faker.phone.number(),
      personalEmail: faker.internet.email({ firstName, lastName }),
      workEmail: faker.internet.email({ firstName, lastName, provider: 'company.com' }),
      fax: faker.phone.number(),
      website: faker.internet.url(),
      skype: faker.internet.username({ firstName, lastName }),
      slack: `@${faker.internet.username({ firstName, lastName })}`,
      telegram: `@${faker.internet.username({ firstName, lastName })}`,

      // Address
      homeStreet: faker.location.streetAddress(),
      homeCity: faker.location.city(),
      homeState: faker.location.state(),
      homeZip: faker.location.zipCode(),
      homeCountry: faker.location.country(),
      workStreet: faker.location.streetAddress(),
      workCity: faker.location.city(),
      workState: faker.location.state(),
      workZip: faker.location.zipCode(),
      workCountry: faker.location.country(),

      // Employment
      jobTitle: faker.person.jobTitle(),
      department: faker.person.jobArea(),
      division: faker.person.jobDescriptor(),
      team: faker.helpers.arrayElement(['Engineering', 'Product', 'Sales', 'Marketing', 'Support']),
      role: faker.helpers.arrayElement(['IC', 'Manager', 'Director', 'Lead']),
      hireDate: faker.date.past({ years: 10 }).toISOString().split('T')[0],
      terminationDate: faker.helpers.arrayElement([
        null,
        faker.date.future().toISOString().split('T')[0],
      ]),
      tenure: faker.number.int({ min: 1, max: 15 }),
      employeeId: faker.string.numeric({ length: 6 }),
      employmentType: faker.helpers.arrayElement([
        'Full-time',
        'Part-time',
        'Contractor',
        'Intern',
      ]),
      manager: faker.person.fullName(),
      location: faker.location.city(),
      workSchedule: faker.helpers.arrayElement(['9-to-5', 'Flexible', 'Shift Work']),
      remoteStatus: faker.helpers.arrayElement(['Remote', 'Hybrid', 'Onsite']),

      // Financial
      baseSalary,
      bonus,
      commission,
      stockOptions: faker.number.int({ min: 100, max: 5000 }),
      taxWithholding: faker.number.int({ min: 5000, max: 40000 }),
      retirement401k: faker.number.int({ min: 1000, max: 15000 }),
      healthDeduction: faker.number.int({ min: 500, max: 3000 }),
      payFrequency: faker.helpers.arrayElement(['Monthly', 'Semi-monthly', 'Bi-weekly']),
      bankAccount: faker.finance.accountNumber(),
      routingNumber: faker.finance.routingNumber(),
      currency: faker.finance.currencyCode(),
      totalComp,

      // Performance
      overallRating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      selfRating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      managerRating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      peerRating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      goalsSet,
      goalsCompleted,
      completionRate,
      lastReviewDate: faker.date.past().toISOString().split('T')[0],
      nextReviewDate: faker.date.future().toISOString().split('T')[0],
      promotionEligible: faker.datatype.boolean(),

      // Education
      highestDegree: faker.helpers.arrayElement(["Bachelor's", "Master's", 'PhD', "Associate's"]),
      fieldOfStudy: faker.person.jobArea(),
      university: `${faker.company.name()} University`,
      graduationYear: faker.number.int({ min: 1980, max: 2025 }),
      certName: faker.helpers.arrayElement(['PMP', 'AWS Architect', 'CPA', 'Scrum Master']),
      certIssuer: faker.helpers.arrayElement([
        'PMI',
        'Amazon Web Services',
        'AICPA',
        'Scrum Alliance',
      ]),
      certDate: faker.date.past().toISOString().split('T')[0],
      certExpiry: faker.date.future().toISOString().split('T')[0],

      // Health & Benefits
      healthPlan: faker.helpers.arrayElement([
        'Standard PPO',
        'High Deductible HSA',
        'Premium HMO',
      ]),
      dentalPlan: faker.helpers.arrayElement(['Basic Dental', 'Delta Dental Premier']),
      visionPlan: faker.helpers.arrayElement(['VSP Select', 'VSP Premium']),
      lifeInsurance: faker.helpers.arrayElement(['$50,000 Group Life', '$100,000 Group Life']),
      vacationDays: faker.number.int({ min: 10, max: 25 }),
      sickDays: faker.number.int({ min: 5, max: 12 }),
      personalDays: faker.number.int({ min: 2, max: 5 }),
      disability: faker.helpers.arrayElement(['Long Term & Short Term', 'Short Term Only']),
      fsa: faker.number.int({ min: 0, max: 3000 }),
      hsa: faker.number.int({ min: 0, max: 5000 }),

      // System
      username: faker.internet.username({ firstName, lastName }),
      accountStatus: faker.helpers.arrayElement(['Active', 'Suspended', 'Inactive']),
      accessLevel: faker.helpers.arrayElement(['User', 'Manager', 'Administrator']),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      lastLogin: faker.date.recent().toISOString(),
      ipAddress: faker.internet.ipv4(),
      deviceType: faker.helpers.arrayElement(['Desktop', 'Laptop', 'Mobile', 'Tablet']),

      // Social & Engagement
      linkedIn: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
      twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      github: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
      engagementScore: faker.number.int({ min: 50, max: 100 }),
      lastSurveyDate: faker.date.past().toISOString().split('T')[0],
      satisfactionRating: faker.number.int({ min: 1, max: 5 }),
    };
  });
};
