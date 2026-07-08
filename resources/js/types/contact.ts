export type Contact = {
    id: number;
    fullName: string;
    nickname: string | null;
    phone: string | null;
    address: string | null;
    relationship: string | null;
    facebook: string | null;
    birthday: string | null;
    notes: string | null;
    tags: string[];
    isArchived: boolean;
    archivedAt: string | null;
    createdAt: string | null;
    updatedAt: string | null;
};

export type ContactFilters = {
    status: 'active' | 'archived' | 'all';
};

export type PaginatedContacts = {
    data: Contact[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
};
