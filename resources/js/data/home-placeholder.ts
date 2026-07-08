export type PlaceholderContact = {
    id: number;
    fullName: string;
    nickname?: string;
    relationship: string;
    outstandingBalance: number;
};

export type PlaceholderReminder = {
    id: number;
    contactName: string;
    title: string;
    reminderAt: string;
    isOverdue: boolean;
};

export type PlaceholderStatistic = {
    label: string;
    value: number;
    format: 'money' | 'count';
};

export type FinancialEventType =
    | 'loan'
    | 'repayment'
    | 'activity'
    | 'reminder'
    | 'note';

export type PlaceholderFinancialEvent = {
    id: number;
    type: FinancialEventType;
    title: string;
    contactName: string;
    occurredAt: string;
    amount?: number;
};

export const placeholderStatistics: PlaceholderStatistic[] = [
    {
        label: 'Outstanding balance',
        value: 125_075,
        format: 'money',
    },
    {
        label: 'Total lent',
        value: 450_000,
        format: 'money',
    },
    {
        label: 'Total collected',
        value: 324_925,
        format: 'money',
    },
    {
        label: 'Active contacts',
        value: 8,
        format: 'count',
    },
];

export const placeholderContacts: PlaceholderContact[] = [
    {
        id: 1,
        fullName: 'Maria Santos',
        nickname: 'Mari',
        relationship: 'Friend',
        outstandingBalance: 50_000,
    },
    {
        id: 2,
        fullName: 'Juan Dela Cruz',
        relationship: 'Neighbor',
        outstandingBalance: 25_075,
    },
    {
        id: 3,
        fullName: 'Ana Reyes',
        nickname: 'Ana',
        relationship: 'Coworker',
        outstandingBalance: 0,
    },
];

export const placeholderReminders: PlaceholderReminder[] = [
    {
        id: 1,
        contactName: 'Maria Santos',
        title: 'Loan due tomorrow',
        reminderAt: 'Tomorrow, 9:00 AM',
        isOverdue: false,
    },
    {
        id: 2,
        contactName: 'Juan Dela Cruz',
        title: 'Weekly follow-up',
        reminderAt: 'Friday, 6:00 PM',
        isOverdue: false,
    },
    {
        id: 3,
        contactName: 'Ana Reyes',
        title: 'Overdue repayment',
        reminderAt: 'Yesterday, 5:00 PM',
        isOverdue: true,
    },
];

export const placeholderFinancialEvents: PlaceholderFinancialEvent[] = [
    {
        id: 1,
        type: 'repayment',
        title: 'Repayment received',
        contactName: 'Maria Santos',
        occurredAt: 'Today, 2:30 PM',
        amount: 5_000,
    },
    {
        id: 2,
        type: 'loan',
        title: 'New loan recorded',
        contactName: 'Juan Dela Cruz',
        occurredAt: 'Yesterday, 10:15 AM',
        amount: 10_000,
    },
    {
        id: 3,
        type: 'activity',
        title: 'Salary activity noted',
        contactName: 'Ana Reyes',
        occurredAt: 'Mar 5, 8:00 AM',
        amount: 25_000,
    },
    {
        id: 4,
        type: 'note',
        title: 'Note added',
        contactName: 'Maria Santos',
        occurredAt: 'Mar 4, 4:45 PM',
    },
];
