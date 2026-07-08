import { Head, Link } from '@inertiajs/react';
import ContactController from '@/actions/App/Http/Controllers/ContactController';
import { ContactForm } from '@/components/contacts/contact-form';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { edit, index, show } from '@/routes/contacts';
import type { Contact } from '@/types/contact';

type ContactsEditProps = {
    contact: Contact;
};

export default function ContactsEdit({ contact }: ContactsEditProps) {
    return (
        <>
            <Head title={`Edit ${contact.fullName}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 pb-8 md:max-w-2xl md:p-6">
                <div className="flex items-start justify-between gap-4">
                    <Heading
                        variant="small"
                        title="Edit contact"
                        description={contact.fullName}
                    />
                    <Button variant="outline" asChild>
                        <Link href={show(contact.id)}>Back</Link>
                    </Button>
                </div>

                <ContactForm
                    form={ContactController.update.form(contact.id)}
                    contact={contact}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

ContactsEdit.layout = {
    breadcrumbs: [
        {
            title: 'Contacts',
            href: index(),
        },
        {
            title: 'Edit contact',
            href: edit(0),
        },
    ],
};
