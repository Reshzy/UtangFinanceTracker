import { Head, Link, router } from '@inertiajs/react';
import { Plus, Users } from 'lucide-react';
import Heading from '@/components/heading';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { create, index, show } from '@/routes/contacts';
import type { ContactFilters, PaginatedContacts } from '@/types/contact';

type ContactsIndexProps = {
    contacts: PaginatedContacts;
    filters: ContactFilters;
};

const statusOptions: Array<{ value: ContactFilters['status']; label: string }> =
    [
        { value: 'active', label: 'Active' },
        { value: 'archived', label: 'Archived' },
        { value: 'all', label: 'All' },
    ];

export default function ContactsIndex({
    contacts,
    filters,
}: ContactsIndexProps) {
    const getInitials = useInitials();

    return (
        <>
            <Head title="Contacts" />

            <div className="flex flex-1 flex-col gap-6 p-4 pb-8 md:max-w-3xl md:p-6">
                <div className="flex items-start justify-between gap-4">
                    <Heading
                        title="Contacts"
                        description="People you lend to and track financially"
                    />
                    <Button asChild>
                        <Link href={create()}>
                            <Plus className="size-4" />
                            Add contact
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant={
                                filters.status === option.value
                                    ? 'default'
                                    : 'outline'
                            }
                            size="sm"
                            onClick={() =>
                                router.get(
                                    index({ query: { status: option.value } }),
                                    {},
                                    { preserveState: true },
                                )
                            }
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>

                {contacts.data.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                            <Users className="size-10 text-muted-foreground" />
                            <div className="space-y-1">
                                <p className="font-medium">No contacts yet</p>
                                <p className="text-sm text-muted-foreground">
                                    Add someone you lend to or track financially.
                                </p>
                            </div>
                            <Button asChild>
                                <Link href={create()}>Add contact</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <ul className="space-y-3">
                        {contacts.data.map((contact) => (
                            <li key={contact.id}>
                                <Link
                                    href={show(contact.id)}
                                    prefetch
                                    className="block"
                                >
                                    <Card
                                        className={cn(
                                            'gap-0 py-4 shadow-sm transition-colors hover:bg-muted/40',
                                            contact.isArchived && 'opacity-70',
                                        )}
                                    >
                                        <CardHeader className="px-4 pb-2">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-10">
                                                    <AvatarFallback className="text-sm">
                                                        {getInitials(
                                                            contact.fullName,
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <CardTitle className="truncate text-base">
                                                            {contact.fullName}
                                                        </CardTitle>
                                                        {contact.isArchived && (
                                                            <Badge variant="secondary">
                                                                Archived
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <CardDescription className="truncate">
                                                        {contact.relationship}
                                                        {contact.nickname
                                                            ? ` · ${contact.nickname}`
                                                            : ''}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="px-4 pt-0">
                                            <p className="truncate text-sm text-muted-foreground">
                                                {contact.phone}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {contacts.meta.last_page > 1 && (
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            Page {contacts.meta.current_page} of{' '}
                            {contacts.meta.last_page}
                        </p>
                        <div className="flex gap-2">
                            {contacts.links.prev && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={contacts.links.prev}>
                                        Previous
                                    </Link>
                                </Button>
                            )}
                            {contacts.links.next && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={contacts.links.next}>Next</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

ContactsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Contacts',
            href: index(),
        },
    ],
};
