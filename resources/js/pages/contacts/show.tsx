import { Form, Head, Link } from '@inertiajs/react';
import ContactController from '@/actions/App/Http/Controllers/ContactController';
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
import { edit, index } from '@/routes/contacts';
import type { Contact } from '@/types/contact';

type ContactsShowProps = {
    contact: Contact;
};

export default function ContactsShow({ contact }: ContactsShowProps) {
    const getInitials = useInitials();

    return (
        <>
            <Head title={contact.fullName} />

            <div className="flex flex-1 flex-col gap-6 p-4 pb-8 md:max-w-2xl md:p-6">
                <div className="flex items-start justify-between gap-4">
                    <Heading
                        variant="small"
                        title={contact.fullName}
                        description={contact.relationship ?? undefined}
                    />
                    <Button variant="outline" asChild>
                        <Link href={index()}>Back</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Avatar className="size-12">
                                <AvatarFallback>
                                    {getInitials(contact.fullName)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <CardTitle>{contact.fullName}</CardTitle>
                                    {contact.isArchived && (
                                        <Badge variant="secondary">
                                            Archived
                                        </Badge>
                                    )}
                                </div>
                                {contact.nickname && (
                                    <CardDescription>
                                        {contact.nickname}
                                    </CardDescription>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Detail label="Phone" value={contact.phone} />
                        <Detail label="Address" value={contact.address} />
                        <Detail
                            label="Relationship"
                            value={contact.relationship}
                        />
                        <Detail label="Facebook" value={contact.facebook} />
                        <Detail label="Birthday" value={contact.birthday} />
                        <Detail label="Notes" value={contact.notes} />
                        {contact.tags.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Tags</p>
                                <div className="flex flex-wrap gap-2">
                                    {contact.tags.map((tag) => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex flex-wrap gap-3">
                    <Button asChild>
                        <Link href={edit(contact.id)}>Edit</Link>
                    </Button>

                    {contact.isArchived ? (
                        <Form {...ContactController.restoreArchive.form(contact.id)}>
                            {({ processing }) => (
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    disabled={processing}
                                >
                                    Restore
                                </Button>
                            )}
                        </Form>
                    ) : (
                        <Form {...ContactController.archive.form(contact.id)}>
                            {({ processing }) => (
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    disabled={processing}
                                >
                                    Archive
                                </Button>
                            )}
                        </Form>
                    )}

                    <Form {...ContactController.destroy.form(contact.id)}>
                        {({ processing }) => (
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={processing}
                            >
                                Delete
                            </Button>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

function Detail({
    label,
    value,
}: {
    label: string;
    value: string | null;
}) {
    if (!value) {
        return null;
    }

    return (
        <div className="space-y-1">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-sm text-muted-foreground">{value}</p>
        </div>
    );
}

ContactsShow.layout = {
    breadcrumbs: [
        {
            title: 'Contacts',
            href: index(),
        },
    ],
};
